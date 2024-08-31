import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  socket: undefined,
  messagesSearch: false,
  userContacts: [],
  onlineUsers: [],
  filteredContacts: [],
  videoCall: undefined,
  voiceCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };
    case reducerCases.SET_ALL_CONTACTS_PAGE:
      return {
        ...state,
        contactsPage: !state.contactsPage,
      };
    case reducerCases.CHANGE_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.user,
      };
    case reducerCases.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case reducerCases.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    case reducerCases.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case reducerCases.SET_MESSAGE_SEARCH:
      return {
        ...state,
        messagesSearch: !state.messagesSearch,
      };
    case reducerCases.SET_USER_CONTACTS:
      return {
        ...state,
        userContacts: action.userContacts,
      };
    case reducerCases.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    case reducerCases.SET_CONTACT_SEARCH: {
      const filteredContacts = state.userContacts.filter((contact) =>
        contact.name.toLowerCase().includes(action.contactSearch.toLowerCase())
      );
      return {
        ...state,
        contactSearch: action.contactSearch,
        filteredContacts,
      };
    }
    case reducerCases.SET_VIDEO_CALL:
      return {
        ...state,
        videoCall: action.videoCall,
      };
    case reducerCases.SET_VOICE_CALL:
      return {
     //The state in this context is crucial because it holds the entire global state of your application. The reducer function is responsible for updating this state in response to actions like SET_VOICE_CALL. 
     //By preserving the existing state with ...state and only updating the relevant parts (in this case, the voiceCall property), the reducer ensures that the global state remains consistent and only the necessary parts are modified.
        ...state,                     // The current global state of the application is spread here to ensure that all existing properties and values are preserved.
        voiceCall: action.voiceCall,  // Here, the voiceCall data (including type, roomId, etc.) is stored in the global state.
      };
    case reducerCases.SET_INCOMING_VOICE_CALL:
      return {
        ...state,
        incomingVoiceCall: action.incomingVoiceCall,
      };
    case reducerCases.SET_INCOMING_VIDEO_CALL:
      return {
        ...state,
        incomingVideoCall: action.incomingVideoCall,
      };
    case reducerCases.END_CALL:
      return {
        ...state,
        voiceCall: undefined,
        videoCall: undefined,
        incomingVideoCall: undefined,
        incomingVoiceCall: undefined,
      };
    case reducerCases.SET_EXIT_CHAT:
      return {
        ...state,
        currentChatUser: undefined,
      };

    default:
      return state;
  }
};

export default reducer;

/*
This file contains the initial state of the application and the reducer function that dictates how the state should change in response to different actions. The initialState object defines the default values for various pieces of state, such as userInfo, currentChatUser, messages, socket, and states related to calls like videoCall and voiceCall.

The reducer function takes the current state and an action as arguments. It then uses a switch statement to determine which action 
type (from constants.js) has been dispatched. Depending on the action type, the state is updated accordingly. For instance, if the action type
 is SET_USER_INFO, the reducer updates the userInfo in the state. The reducer handles various state updates related to messaging, contacts, calls,
  and other aspects of the app's functionality.
*/
