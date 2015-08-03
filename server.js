define(['repository/repositories-initializer'], function (repositories) {
    'use strict';

    var TimeInterval = 1000;

    function authorize(username, password, onAuthorizeCallback, onAuthorizeError) {
        return repositories.userRepository.authorize(username, password, onAuthorizeCallback, onAuthorizeError);
    }

    function getAllUsers(onGetAllUsersCallback, onGetAllUsersError) {
        return repositories.userRepository.getAllInViewModelsFormat(onGetAllUsersCallback, onGetAllUsersError);
    }

    function getPublicRoomModel(publicRoomId, onGetPublicRoomModel, onGetPublicRoomModelError) {
        var publicRoomModel = repositories.publicRoomRepository.getById(publicRoomId);
        setTimeout(function () {
            try {
                onGetPublicRoomModel(publicRoomModel);
            } catch (exception) {
                onGetPublicRoomModelError();
            }
        }, TimeInterval);
    }

    function getPrivateRoomModel(privateRoomId, onGetPrivateRoomModel, onGetPrivateRoomModelError) {
        var privateRoomModel = repositories.privateRoomRepository.getById(privateRoomId);
        setTimeout(function () {
            try {
                onGetPrivateRoomModel(privateRoomModel);
            } catch (exception) {
                onGetPrivateRoomModelError();
            }
        }, TimeInterval);
    }

    function sendMessage(newMessageText, userId, authorName, roomId, isPublicRoom, onSendMessage, onSendMessageError) {
        var fullRoom = null;
        if (isPublicRoom) {
            fullRoom = repositories.publicRoomRepository.getById(roomId);
        } else {
            fullRoom = repositories.privateRoomRepository.getById(roomId);
        }

        var newMessage = {
            id: fullRoom.messages.length + 1,
            authorId: userId,
            authorName: authorName,
            publicRoomId: (isPublicRoom) ? roomId : null,
            privateRoomId: (isPublicRoom) ? null : roomId,
            date: new Date(),
            text: newMessageText
        };

        repositories.messageRepository.create(newMessage);

        if (isPublicRoom) {
            repositories.publicRoomRepository.getById(roomId).messages.push(newMessage);
        } else {
            repositories.privateRoomRepository.getById(roomId).messages.push(newMessage);
        }

        setTimeout(function () {
            try {
                onSendMessage(newMessage);
            } catch (exception) {
                onSendMessageError();
            }
        }, TimeInterval);
    }

    return {
        authorize: authorize,
        getAllUsers: getAllUsers,
        getPublicRoomModel: getPublicRoomModel,
        getPrivateRoomModel: getPrivateRoomModel,
        sendMessage: sendMessage
    };

});
