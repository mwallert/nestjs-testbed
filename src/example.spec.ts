class FriendsList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendShip(name);
    }

    announceFriendShip(name) {
        global.console.log(`${name} is now a friend!`);
    }

    removeFriend(name) {
        const index = this.friends.indexOf(name);

        if (index === -1) {
            throw new Error(`${name} not found in friends list`);
        }

        this.friends.splice(index, 1);
    }
}

describe('FriendsList', () => {
    let friendsList;

    beforeEach(() => {
        friendsList = new FriendsList();
    });

    it('initializes friends list', () => {
        expect(friendsList.friends.length).toEqual(0);
    });

    it('adds a friend to the list', () => {
        friendsList.addFriend('Mark');

        expect(friendsList.friends.length).toEqual(1);
    });

    it('announces friendship', () => {
        friendsList.announceFriendShip = jest.fn();

        expect(friendsList.announceFriendShip).not.toHaveBeenCalled();

        friendsList.addFriend('Mark');

        expect(friendsList.announceFriendShip).toHaveBeenCalledWith('Mark');
    });

    describe('remove friend', () => {
        it('removes a friend from the list', () => {
            const friendName: string = 'Mark';

            friendsList.addFriend(friendName);

            expect(friendsList.friends[0]).toEqual(friendName);

            friendsList.removeFriend(friendName);

            expect(friendsList.friends[0]).toEqual(undefined);
        });

        it('throws an error if the friend does not exist', () => {
            expect(() => friendsList.removeFriend('Mark')).toThrow(new Error(`Mark not found in friends list`));
        });
    });
});