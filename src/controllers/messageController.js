export class MessageController {
  constructor() {}

  messageHandler = (req, _) => {
    const { payload } = req;
    const items = Object.values(payload).reduce(
      (acc, current) => acc.concat(...current),
      []
    );
    return this.formattedObject(items, 0, []);
  };

  formattedObject(array, level, result) {
    if (array.length < 1) {
      return result;
    }
    const lv = array.filter((d) => d.level === level);
    for (const item of lv) {
      const index = array.findIndex((data) => data.id === item.id);
      const itemGroupById =
        array.filter((data) => data.parent_id === item.id) || [];
      if (itemGroupById.length) {
        array[index].children.push(...itemGroupById);
      }

      if (!result.length) {
        result.push(array[index]);
      }

      array = array.slice(1);
    }

    return this.formattedObject(array, level + 1, result);
  }
}
