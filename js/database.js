const db = new Dexie("ColorsDB");
db.version(1).stores({
  colors: "++id, color",
});

const getAllColors = async () => {
  try {
    const allColors = await db.colors.toArray();
    return allColors;
  } catch (error) {
    (e) => console.log("Error: " + (e.stack || e));
  }
};

const deleteColor = async (id) => {
  try {
    db.colors.delete(id)
  } catch (error) {
    (e) => console.log("Error: " + (e.stack || e));
  }
}

const deleteAllColors = async () => {
  try {
    db.colors.clear()
  } catch (error) {
    (e) => console.log("Error: " + (e.stack || e));
  }
}

const createColor = async (color) => {
  try {
    await db.colors.add({ color: `${color}` });
    const currentColors = await db.colors.toArray();
    const lastElement = currentColors[currentColors.length - 1];
    console.log("Color added: " + JSON.stringify(lastElement));
  } catch (error) {
    (e) => console.log("Error: " + (e.stack || e));
  }
};

export { getAllColors, createColor, deleteColor, deleteAllColors };
