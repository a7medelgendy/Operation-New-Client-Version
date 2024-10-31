import cache from './cache';

class User {
  constructor() {
    this.userData = cache.get('user');
  }

  /**
   * check if user logged in
   *
   * @return {boolean}
   */
  isLoggedIn() {
    return this.userData != null;
  }

  /**
   * Log the user in
   * it will store the data in storage engine i.e local storage
   * but will not make ajax request
   *
   * @param {object} userData
   * @return {void}
   */
  login(userData) {
    this.userData = userData;
    cache.set('user', userData);
    cache.set('activeIndex', 0);
  }

  hasRole(role) {
    //on branch old master
    //return this.userData.roleNames.includes(role);
    return this.userData.roleNames.includes(role);
  }

  hasSpecialRole(role) {
    return this.userData.specialRoles.includes(role);
  }

  hasGroup(group) {
    return this.userData.groupNames.includes(group);
  }

  /**
   * Log the user out
   */
  logout() {
    this.userData = null;
    cache.remove('user');
    cache.remove('userToken');
  }

  /**
   * Get user access token
   *
   * @returns {string}
   */
  getAccessToken() {
    return this.userData?.token;
  }
}

export default new User();
