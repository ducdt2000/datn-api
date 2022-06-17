import { ROLE } from '../constants/common';

export const getUserAuthLevel = (user: any): ROLE => {
  let authRole = user.role;
  return authRole;
};
