class User {
  constructor() {
    this.colors = [];
    this.currentTheme = "light";
  }

  getColors() {
    return this.colors;
  }

  setColors(colors) {
    this.colors = colors;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  setCurrentTheme(currentTheme) {
    this.currentTheme = currentTheme;
  }
}

export default User;
