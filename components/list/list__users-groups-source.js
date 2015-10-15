import List from 'list/list';
import HubSourceUsersGroups from 'hub-source/hub-source__users-groups';

export default class ListUsersGroupsSource extends HubSourceUsersGroups {
  getForList(query) {
    return this.getUserAndGroups(query)
      .then(([users, groups]) => {
        let groupsTitle = {
          rgItemType: List.ListProps.Type.SEPARATOR,
          key: 1,
          description: this.options.GroupsTitle
        };

        let groupsForList = groups.map(group => {
          return Object.assign(group, {
            key: group.id,
            label: group.name,
            description: this.options.getPluralForUserCount(group.userCount)
          });
        });

        let usersTitle = {
          rgItemType: List.ListProps.Type.SEPARATOR,
          key: 2,
          description: this.options.UsersTitle
        };

        let usersForList = users.map((user) => {
          return Object.assign(user, {
            key: user.id,
            label: user.name,
            icon: user.profile.avatar.url,
            description: user.login
          });
        });

        return [groupsTitle, ...groupsForList, usersTitle, ...usersForList];
      });
  }
}