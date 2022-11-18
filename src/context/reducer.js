export const actionType = {
	SET_ADMIN: "SET_ADMIN",
	SET_USER: "SET_USER",
	SET_CART: "SET_CART",
	SET_INFO_ORDER: "SET_INFO_ORDER",
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_ADMIN:
			return {
				...state,
				admin: action.admin,
			};

		case actionType.SET_USER:
			return {
				...state,
				user: action.user,
			};

		case actionType.SET_CART:
			return {
				...state,
				cart: action.cart,
			};

		case actionType.SET_INFO_ORDER:
			return {
				...state,
				info_order: action.info_order,
			};

		default:
			return state;
	}
};

export default reducer;
