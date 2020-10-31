import axios from 'axios';

export default class TwitterService {
    static api = axios.create({
        baseURL: 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets'
    })

    static token = 'AAAAAAAAAAAAAAAAAAAAAOspJQEAAAAAC3XhLxKSN9FFMgz%2BbvNPf3oO35o%3DqmO9q9vok3TUxnBFnQU858irbe7NMIggw722M7u7FbLrWOliG4';

    static search(query) {
        return TwitterService.api.get(`/search/recent`, {
            headers: {
                Authorization: 'Bearer ' + TwitterService.token
            },
            params: {
                query: query,
                'tweet.fields': 'created_at,author_id',
                expansions: 'author_id'
            }
        });
    }
}