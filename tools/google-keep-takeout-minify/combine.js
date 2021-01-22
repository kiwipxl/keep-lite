const crypto = require("crypto");
const moment = require("moment");

module.exports = combine;

function itemsToUUIDMap(items) {
  let map = {};

  for (const item of items) {
    if (map[item.uuid]) {
      throw new Error(`duplicate uuid found: ${item.uuid}`);
    }

    map[item.uuid] = item;
  }

  return map;
}

function getSNID(item) {
  switch (item.content_type) {
    case "Note":
      return crypto
        .createHash("md5")
        .update("note-" + item.content.title + item.content.text)
        .digest("hex");

    case "Tag":
      const name = item.content.title.replace(/\//g, ".");
      return "tag-" + name;

    default:
      return item.uuid;
  }
}

function itemsToSNIDMap(items) {
  let map = {};

  for (const item of items) {
    const snid = getSNID(item);

    if (map[snid]) {
      // throw new Error(`found duplicate snid ${snid} (uuid ${item.uuid})`);
    }

    item.snid = snid;
    map[snid] = item;
  }

  return map;
}

function combine(srcBackup, dstBackup) {
  const uuidSrcItems = itemsToUUIDMap(srcBackup.items);
  const uuidDstItems = itemsToUUIDMap(dstBackup.items);

  let snidSrcItems = itemsToSNIDMap(srcBackup.items, uuidSrcItems);
  let snidDstItems = itemsToSNIDMap(dstBackup.items, uuidDstItems);

  // Combine uuid items
  for (const srcUUID of Object.keys(uuidSrcItems)) {
    const srcItem = uuidSrcItems[srcUUID];
    let dstItem = uuidDstItems[srcUUID];

    if (!dstItem) {
      uuidDstItems[srcUUID] = srcItem;
    }
  }

  // Combine snid items
  for (const srcItem of Object.values(snidSrcItems)) {
    let dstItem = snidDstItems[srcItem.snid];

    if (dstItem) {
      // Merge src item and dst item

      switch (srcItem.content_type) {
        case "Note":
          dstItem.created_at = srcItem.created_at;
          dstItem.updated_at = srcItem.updated_at;
          break;

        case "Tag":
          // Combine tag references
          let newReferences = dstItem.content.references.concat(
            srcItem.content.references
          );
          dstItem.content.references = newReferences;

          console.log(
            `merging ${srcItem.content.title} tag with ${dstItem.content.title}`
          );
          break;
      }
    } else {
      snidDstItems[srcItem.snid] = snidSrcItems[srcItem.snid];

      console.log(`added new ${srcItem.content_type} (${srcItem.snid})`);
    }
  }

  // Post operations on final items
  for (const dstItem of Object.values(snidDstItems)) {
    if (dstItem.content.appData) {
      dstItem.content.appData[
        "org.standardnotes.sn"
      ].client_updated_at = moment().toDate();
    } else {
      dstItem.content.appData = {
        "org.standardnotes.sn": {
          client_updated_at: moment().toDate(),
        },
      };
    }

    switch (dstItem.content_type) {
      case "Note":
        break;

      case "Tag":
        let references = [];

        for (const ref of dstItem.content.references) {
          try {
            ref.snid = getSNID(uuidDstItems[ref.uuid]);
            ref.uuid = snidDstItems[ref.snid].uuid;
            references.push(ref);
          } catch (err) {
            console.warn(
              `removed uuid ${ref.uuid} from tag ${dstItem.content.title}`
            );
          }
        }

        // Remove duplicate references
        const filteredRefs = references.filter((ref) =>
          references.findIndex((x) => x !== ref && x.uuid === ref.uuid)
        );

        if (filteredRefs.length !== references.length) {
          console.log(
            `removed ${
              references.length - filteredRefs.length
            } duplicate notes from tag ${dstItem.content.title}`
          );
        }

        dstItem.content.references = filteredRefs;
        break;
    }
  }

  return { items: Object.values(snidDstItems) };
}
