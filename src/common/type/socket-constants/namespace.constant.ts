/**
 * main namespace constants
 */
export const NamespaceConstants = {
  collaboratorChat: 'collaborator-chat',
  publicChat: 'public-chat',
  privateChat: 'private-chat',
  alert: 'alert',
  techSupport: 'tech-support',
  qna: 'qna',
  pollResultPage: 'poll-result-page',
  presenterView: 'presenter-view',
};

export const TechSupportConstants = {
  namespace: `/${NamespaceConstants.techSupport}`,
  events: {
    JOINED: `joined.${NamespaceConstants.techSupport}`,
    MESSAGE: `message.${NamespaceConstants.techSupport}`,
    SEND_REQUESTER_MESSAGE: `send-requester-message.${NamespaceConstants.techSupport}`,
    SEND_SUPPORTER_MESSAGE: `send-supporter-message.${NamespaceConstants.techSupport}`,
    READ_MESSAGE: `read-message.${NamespaceConstants.techSupport}`,
  },
};

export const CollaboratorChatEventsConstants = {
  namespace: `/${NamespaceConstants.collaboratorChat}`,
  events: {
    JOINED: `joined.${NamespaceConstants.collaboratorChat}`,
    MESSAGE: `message.${NamespaceConstants.collaboratorChat}`,
    TYPING: `typing.${NamespaceConstants.collaboratorChat}`,
    SENDMESSAGE: `send-message.${NamespaceConstants.collaboratorChat}`,
    READ_MESSAGE: `read-message.${NamespaceConstants.collaboratorChat}`,
  },
};

export const PublicChatEventsConstants = {
  namespace: `/${NamespaceConstants.publicChat}`,
  events: {
    JOINED: `joined.${NamespaceConstants.publicChat}`,
    MESSAGE: `message.${NamespaceConstants.publicChat}`,
    SEND_MESSAGE: `send-message.${NamespaceConstants.publicChat}`,
    READ_MESSAGE: `read-message.${NamespaceConstants.publicChat}`,
    DELETE_MESSAGE: `delete-message.${NamespaceConstants.publicChat}`,
  },
};

export const PrivateChatEventsConstants = {
  namespace: `/${NamespaceConstants.privateChat}`,
  events: {
    SEND_ADMIN_MESSAGE: `admin-message.${NamespaceConstants.privateChat}`,
    SEND_EVENT_USER_MESSAGE: `user-message.${NamespaceConstants.privateChat}`,
    MESSAGE: `message.${NamespaceConstants.privateChat}`,
  },
};

export const QnAEventsConstants = {
  namespace: `/${NamespaceConstants.qna}`,
  events: {
    /**
     * Alert when event user, admin and event-admins joined the QnA.
     * sent to: event-user who joined, admin and event-admins
     */
    JOINED: `joined.${NamespaceConstants.qna}`,

    /**
     * Alert when admin and event-admins create a new QnA.
     * sent to: admin and event-admins connected in control room
     */
    CREATE: `create.${NamespaceConstants.qna}`,

    /**
     *sent to: control room (admin, event admins) the QnA
     */
    DELETE: `delete.${NamespaceConstants.qna}`,

    /**
     * sent to: control room (admin, event admins) only.
     * This update doesn't modify the real query, it just updates the modifiedQuery field which is not shown in the user interface.
     */
    UPDATE: `update.${NamespaceConstants.qna}`,

    /**
     * sent to: control room (admin, event admins) and in presenter view.
     */
    SENDTOSPEAKER: `send-to-speaker.${NamespaceConstants.qna}`,

    /**
     * sent to: control room (admin, event admins).
     */
    QUEUETOSPEAKER: `queue-to-speaker.${NamespaceConstants.qna}`,

    /**
     * sent to: control room (admin, event admins) and event user who created the QnA
     */
    REPLY: `reply.${NamespaceConstants.qna}`,

    /**
     * sent to: control room (admin, event admins).
     */
    HIGHLIGHT: `highlight-toggle.${NamespaceConstants.qna}`,

    /**
     * sent to: control room (admin, event admins) and in presenter view.
     */
    COMMENT: `comment.${NamespaceConstants.qna}`,

    /**
     * sent to: control room (admin, event admins)
     */
    ANSWERED: `answered-toggle.${NamespaceConstants.qna}`,

    /**
     * Ask a question for admin and event-admins
     */
    ADMIN_ASK: `admin-ask.${NamespaceConstants.qna}`,
    ADMIN_COMMENT: `admin-comment.${NamespaceConstants.qna}`,
    ADMIN_REPLY: `admin-reply.${NamespaceConstants.qna}`,
    EVENT_USER_ASK: `event-user-ask.${NamespaceConstants.qna}`,
  },
};
// console.log(QnAEventsConstants);

export const AlertEventsConstants = {
  namespace: `/${NamespaceConstants.alert}`,
  events: {
    NOTIFICATION: 'notification.alert',
  },
};

/**
 * format of the alerts are always
 * ___ . ____ . ___  (type.action.namespace)
 */
export const alertMsgType = {
  event: 'event',
  broadCast: 'broadcast-msg',
  poll: 'poll',
  publicChat: 'public-chat',
  techSupport: 'tech-support',
  Qna: 'qna',
  htmlEmbed: 'html-embed',
  presenter: 'presenter',
  recordings: 'recordings',
};

export const AlertTypes = {
  joined: `joined.${NamespaceConstants.alert}`,
  /**
   * Alert when user left the event
   * sent to: all event-user, admin and event-admins
   */
  left: `left.${NamespaceConstants.alert}`,

  /**
   * Alert when event status is changed eg; LIVE, DISABLED-LIVE
   * sent to: all event-user, admin and event-admins
   */
  eventStatusChange: `${alertMsgType.event}.status-change.${NamespaceConstants.alert}`,
  /**
   * Alert when event status is changed eg; LIVE, DISABLED-LIVE
   * sent to: all event-user, admin and event-admins
   */
  eventLiveStatusChange: `${alertMsgType.event}.live-status-change.${NamespaceConstants.alert}`,
  /**
   * Alert when video player is changed
   * sent to: all event-user, admin and event-admins
   */
  eventPrimaryVideoPlayerChange: `${alertMsgType.event}.primary-video-player-change.${NamespaceConstants.alert}`,

  /**
   * When admin broadcast a message to all users
   * sent to: all event-user, admin and event-admins
   */
  broadcastMessage: `${alertMsgType.broadCast}.broadcast.${NamespaceConstants.alert}`,

  /**
   * Alert users when broadcasted message is cleared. Broadcasted message is cleared by the admin or event-admin
   * sent to: all event-user, admin and event-admins
   */
  clearBroadcastMessage: `${alertMsgType.broadCast}.clear.${NamespaceConstants.alert}`,

  /**
   * Alert when Poll is deleted by the admin or event-admin
   */
  deleteBroadcastMessage: `${alertMsgType.broadCast}.delete.${NamespaceConstants.alert}`,
  /**
   * Sidebar menu: Poll
   * alert users when the pll sttus is changed to PUBLISHED alert is sent to all event-user, admin and event-admins
   */
  publishPoll: `${alertMsgType.poll}.publish-poll.${NamespaceConstants.alert}`,
  /**
   * Sidebar menu: Poll
   * alert users when the poll is ended alert is sent to all event-user, admin and event-admins
   */
  endPoll: `${alertMsgType.poll}.end-poll.${NamespaceConstants.alert}`,

  /**
   * sidebar menuy: poll
   * alert user when poll is restarted is sent to al event-user admin and event-admins
   */

  restartPoll: `${alertMsgType.poll}.restart-poll.${NamespaceConstants.alert}`,

  /**
   *  Sidebar menu: Public Chat
   *  alert users when the public chat is enabled or disabled alert is sent to all event-user, admin and event-admins
   */
  publicChat: `${alertMsgType.publicChat}.public-chat-status-change.${NamespaceConstants.alert}`,

  /**
   * Sidebar menu: tech support chat
   * alert users when the tech support chat is enabled or disabled alert is sent to all event-user, admin and event-admins
   */

  techSupportChat: `${alertMsgType.techSupport}.tech-support-chat-status-change.${NamespaceConstants.alert}`,
  /**
   *  Sidebar menu: QnA
   *  alert users when the qna is enabled or disabled alert is sent to all event-user, admin and event-admins
   */
  qna: `${alertMsgType.Qna}.qna-status-change.${NamespaceConstants.alert}`,

  clear: `${alertMsgType.Qna}.clear.${NamespaceConstants.alert}`,
  /**
   * Alert when user is registered to the event
   * sent to: admin and event-admins in control room.
   */
  registerEventUser: `registered-event-user.${NamespaceConstants.alert}`,

  /**
   * Alert when html embed is enabled or disabled
   */
  htmlEmbedToggle: `${alertMsgType.htmlEmbed}.toggle.${NamespaceConstants.alert}`,

  htmlEmbeds: `${alertMsgType.htmlEmbed}.html-embeds.${NamespaceConstants.alert}`,

  /**
   * Alert when timer is started
   */
  presenterTimerStart: `${alertMsgType.presenter}.timer-start.${NamespaceConstants.alert}`,
  presenterTimerEnd: `${alertMsgType.presenter}.timer-end.${NamespaceConstants.alert}`,
  presenterTimerReset: `${alertMsgType.presenter}.timer-reset.${NamespaceConstants.alert}`,
  presenterTimerPause: `${alertMsgType.presenter}.timer-pause.${NamespaceConstants.alert}`,
  presenterTimerResume: `${alertMsgType.presenter}.timer-resume.${NamespaceConstants.alert}`,
  presenterFlash: `${alertMsgType.presenter}.flash.${NamespaceConstants.alert}`,

  /**
   * Alert when resources are added or deleted
   */
  addRecording: `${alertMsgType.recordings}.add.${NamespaceConstants.alert}`,
  toggleRecording: `${alertMsgType.recordings}.toggle.${NamespaceConstants.alert}`,
  deleteRecording: `${alertMsgType.recordings}.delete.${NamespaceConstants.alert}`,

  /**
   * Admin and event-admins events start
   */
  markAsRead: `mark-as-read.${NamespaceConstants.alert}`,
  publicChatNotificationCount: `public-chat-notification-count.${NamespaceConstants.alert}`,
  collaboratorChatNotificationCount: `collaborator-chat-notification-count.${NamespaceConstants.alert}`,
  techSupportChatNotificationCount: `tech-support-chat-notification-count.${NamespaceConstants.alert}`,

  /**
   * Alert for publishing the poll results
   */
  publishPollResults: `${alertMsgType.poll}.publish-result.${NamespaceConstants.alert}`,
  /**
   * Admin and event-admins events end
   */
} as const;
// console.log(AlertTypes);
export type AlertTypeValues = (typeof AlertTypes)[keyof typeof AlertTypes];

export const PollResultPageEventsConstants = {
  namespace: `/${NamespaceConstants.pollResultPage}`,
  events: {
    JOINED: `joined.${NamespaceConstants.pollResultPage}`,
    VOTE: `vote.${NamespaceConstants.pollResultPage}`,
  },
};

/**
 * Presenter view namespace constants for presenter view
 */
export const PresenterViewEventsConstants = {
  namespace: `/${NamespaceConstants.presenterView}`,
  events: {
    JOINED: `joined.${NamespaceConstants.presenterView}`,
    TIMERSTART: `timer-start.${NamespaceConstants.presenterView}`,
    TIMEREnd: `timer-end.${NamespaceConstants.presenterView}`,
    TIMERRESET: `timer-reset.${NamespaceConstants.presenterView}`,
    TIMERPAUSE: `timer-pause.${NamespaceConstants.presenterView}`,
    TIMERRESUME: `timer-resume.${NamespaceConstants.presenterView}`,
    FLASH: `flash.${NamespaceConstants.presenterView}`,
    SENDTOSPEAKER: `send-to-speaker.${NamespaceConstants.presenterView}`,
    COMMENT: `comment.${NamespaceConstants.presenterView}`,
    DELETE: `delete.${NamespaceConstants.presenterView}`,
    CLEAR: `clear.${NamespaceConstants.presenterView}`,
  },
};
// console.log(PresenterViewEventsConstants);
