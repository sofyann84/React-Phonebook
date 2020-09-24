let globalState = {
    users: [],
    isActive: false,
    pages: 0,
    limit: 5,
    currentPage: 1,
    offset: 0,
    isSearchModeOn: false,
    searchName: "",
    searchPhone: "",
}

const users = (state = globalState, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                users: action.items.map((item) => {
                    item.added = true;
                    item.isEdit = false
                    return item
                }),
                pages: Number(Math.ceil(action.result / state.limit)),
                result: Number(action.result),
            }

        case 'POST_USER':
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        Phone: action.Phone,
                        Name: action.Name,
                        added: true,
                        isEdit: false,
                        id: action.id
                    }
                ]
            }

        case 'RESEND_USER_SUCCESS':
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item.id === action.id) item.added = true
                    return item
                })
            }

        case 'POST_USER_SUCCESS':
            return state

        case 'POST_USER-FAILURE':
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item.id === action.id) {
                        item.added = false;
                    }
                    return item
                })
            }

        case 'TOGLE':
            return {
                ...state,
                isActive: !state.isActive
            }

        case 'EDIT_CLICK':
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item.id === action.id) {
                        item.isEdit = true;
                    }
                    return item
                })
            }

        case 'EDIT_CLICK_CANCEL':
            return {
                ...state,
                users: state.users.map((item) => {
                    if (item.id === action.id) {
                        item.isEdit = false;
                    }
                    return item
                })
            }

        case 'DELETE_USER':

            return {
                ...state,
                users: state.users.filter((item) => item.id !== action.id)
            }

        case 'UPDATE_USER_SUCCESS':
            return state

        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.id) {
                        item.Name = action.Name;
                        item.Phone = action.Phone;
                        item.isEdit = false
                    }
                    return item

                })
            }
        case "UPDATE_USER_FAILURE":
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.id) {
                        item.isEdit = false
                    }
                    return item
                })
            }

        case 'DELETE_USER_SUCCESS':
            return state

        case 'NEXT_PAGE':
            return {
                ...state,
                currentPage: state.currentPage + 1,
                offset: action.offset
            }

        case 'PREVIOUS_PAGE':
            return {
                ...state,
                currentPage: state.currentPage - 1,
                offset: action.offset

            }
            case 'SWITCH_PAGE':
      return {
        ...state,
        currentPage: action.switchToPage,
        offset: action.offset

      }
    case 'MODE_SEARCH_ACTIVE':
      return {
        ...state,
        isSearchModeOn: true,
        searchName: action.filter.name,
        searchPhone: action.filter.user
      }
    case 'MODE_SEARCH_INACTIVE':
      return {
        ...state,
        isSearchModeOn: false,
        searchName: "",
        searchPhone: ""
      }
    case 'LOAD_USER_FAILURE':
    case 'DELETE_USER_FAILURE':
    default:
      return state
    }
}

export default users;