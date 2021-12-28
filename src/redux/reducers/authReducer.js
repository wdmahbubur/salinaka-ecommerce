

const initState = null;
// {
// id: 'test-123',
// role: 'ADMIN',
// provider: 'password'
// };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {
        id: action.payload.id,
        role: action.payload.role,
        provider: action.payload.provider
      };
    case "SIGNOUT_SUCCESS":
      return null;
    default:
      return state;
  }
};
export default authReducer;