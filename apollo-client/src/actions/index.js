import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag'
import Swal from 'sweetalert2'

const API_URL = 'http://localhost:3001/graphql/'

const client = new ApolloClient({
    uri: API_URL
})

// start load data user
export const loadUserSuccess = ({ result, items }) => ({
    type: 'LOAD_USER_SUCCESS',
    result,
    items
})

export const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE'
})

export const loadUser = (offset = 0, limit = 5) => {
    const usersQuery = gql`
    query {
      users(pagination: {offset: ${offset}, limit: ${limit}}){
        result
        items{
        id
        Name
        Phone
        }
      }
    }`;
    return dispatch => {
        return client.query({
            query: usersQuery,
        })
            .then(function (response) {
                console.log(response);
                dispatch(loadUserSuccess(response.data.users))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadUserFailure())
            });
    }
}
// end load user data
 
//start searchPhone
export const searchUsers = (name, phone, offset = 0, limit = 5) => {
    const searchQuery = gql`
    query users($name:String,$phone:String,$offset:Int,$limit:Int){
      users(name:$name,phone:$phone,pagination:{
        offset:$offset,
        limit:$limit
      }){
        result
        items{
          id
          Name
            Phone
        }
      }
    }`
    return dispatch => {
      return client.query({
        query: searchQuery,
        variables: {
          name,
          phone,
          offset,
          limit
        }
      })
        .then(response => {
          dispatch(loadUserSuccess(response.data.users))
        })
        .catch(error => {
          console.log(error)
          dispatch(loadUserFailure())
        })
    }
  
  }
  
  export const searchMode = (filter) => ({
    type: "MODE_SEARCH_ACTIVE",
    filter
  })
  
  export const cancelSearch = () => ({
    type: "MODE_SEARCH_INACTIVE"
  }
  )
// end search

// start post user data

export const postUserSuccess = (users) => ({
    type: 'POST_USER_SUCCESS',
    users
  })
  
  export const postUserFailure = (id) => ({
    type: 'POST_USER_FAILURE', id
  })
  
  const postUserRedux = (Phone, Name, id) => ({
    type: 'POST_USER', Phone, Name, id
  })
  
  
  export const postUser = (Phone, Name) => {
    const id = Date.now()
    const addQuery = gql`
    mutation addUser($Name: String!, $Phone: String!,$id:ID!) {
      addUser(Name: $Name, Phone: $Phone,id:$id) {
        Name
        Phone
        id
      }
    }`;
    return dispatch => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contact added successfully!',
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        dispatch(postUserRedux(Phone, Name, id))
        return client.mutate({
          mutation: addQuery,
          variables: {
            Name,
            Phone,
            id
          }
        })
          .then(function (response) {
            dispatch(postUserSuccess(response.data.addUser))
          })
          .catch(function (error) {
  
            Swal.fire({
              icon: 'warning',
              title: "Network connection trouble!",
              text: "Click resend button to add your data!",
              type: "warning",
              buttons: true,
              dangerMode: true,
              timer: 1500
            }).then(() => {
              dispatch(postUserFailure(id))
            })
  
          });
      })
  
    }
  }
//end post user data

// start delete user data

const deleteUserRedux = (id) => ({
    type: 'DELETE_USER', id
  })
  
  export const deleteUserSuccess = (users) => ({
    type: 'DELETE_USER_SUCCESS',
    users
  })
  
  export const deleteUserFailure = () => ({
    type: 'DELETE_USER_FAILURE'
  })
  
  
  export const deleteUser = (id) => {
  
    const deleteQuery = gql`
    mutation removeUser($id: ID!) {
      removeUser(id: $id) {
        id
      }
    }`;
    return dispatch => {
      Swal.fire({
        icon: 'warning',
        title: "Are you sure delete this contact?",
        text: "You can't revert this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes Delete it!",
        cancelButtonText: "No, Keep it!",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
  
        if (result.value) {
          dispatch(deleteUserRedux(id))
          return client.mutate({
            mutation: deleteQuery,
            variables: {
              id
            }
          })
            .then(function (response) {
  
              dispatch(deleteUserSuccess(response))
            })
            .catch(function (error) {
              console.error(error);
              dispatch(deleteUserFailure())
            });
        }
      })
  
    }
  }
  
// end delete user data

const resendUserSuccess = (id) => ({
    type: 'RESEND_USER_SUCCESS',
    id
  })

  export const resendUser = (Phone, Name, id) => {
    const addQuery = gql`
    mutation addUser($Phone: String!, $Name: String!,$id:ID!) {
      addUser(Phone: $Phone, Name: $Name,id:$id) {
        Phone
        Name
      }
    }`;
    return dispatch => {
      return client.mutate({
        mutation: addQuery,
        variables: {
          Phone,
          Name,
          id
        }
      })
        .then(function (response) {
          dispatch(resendUserSuccess(id))
        })
        .catch(function (error) {
          console.error(error);
          dispatch(postUserFailure(id))
        });
    }
  }
///////////////////////////////////////////////

  const togleThisButton = () => ({
    type: 'TOGLE'
  })
  
  
  export const TogleButtonCta = () => {
    return dispatch => {
      dispatch(togleThisButton())
    }
  }
  
  
  const clickEdit = (id) => ({
    type: 'EDIT_CLICK',
    id
  })
  
  export const clickEditAct = (id) => {
    return dispatch => {
      dispatch(clickEdit(id))
    }
  }
  
  const cancelEdit = (id) => ({
    type: 'EDIT_CLICK_CANCEL',
    id
  })
  
  export const clickCancelEditAct = (id) => {
    return dispatch => {
      dispatch(cancelEdit(id))
    }
  }
  
  
  const updateRedux = (Phone, id, Name) => ({
    type: 'UPDATE_USER',
    id,
    Phone,
    Name
  })
  
  const updateUserSuccess = (phone) => ({
    type: 'UPDATE_USER_SUCCESS',
    phone
  })
  const updateUserFailure = (id) => ({
    type: "UPDATE_USER_FAILURE",
    id
  })

  export const editUpdateUser = (Phone, id, Name) => {
    const updateQuery = gql`
    mutation updateUser($Phone: String!, $Name: String!,$id:ID!){
      updateUser(Phone: $Phone, Name: $Name,id:$id ){
          Phone,
          Name,
          id
        }
      }`;
    return dispatch => {
      dispatch(updateRedux(Phone, id, Name))
  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contact updated successfully!',
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        return client.mutate({
          mutation: updateQuery,
          variables: {
            Phone,
            Name,
            id
          }
        })
      }).then(function (response) {
        dispatch(updateUserSuccess(response.data))
      }).catch(function (error) {
        Swal.fire({
          icon: 'warning',
          title: "Network connection trouble!",
          text: "Failed to update data!",
          type: "warning",
          buttons: true,
          dangerMode: true,
          timer: 1500
        }).then(() => {
          dispatch(updateUserFailure(id))
        })
      })
    }
  }

  export const nextPage = (offset) => ({
    type: "NEXT_PAGE",
    offset
  })
  
  
  export const prevPage = (offset) => ({
    type: "PREVIOUS_PAGE",
    offset
  })
  
  export const switchPage = (offset, switchToPage) => ({
  
    type: "SWITCH_PAGE",
    offset,
    switchToPage
  
  })