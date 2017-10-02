import { action } from 'mobx'
import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'


const toto_subkey = 'totoguess';



export default class TotoStore extends MobxFirebaseStore {
  constructor() {
      super(firebase.database().ref());
      firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
      })
  }

	resolveFirebaseQuery(sub) { 
		return  this.user ? this.fb.child(toto_subkey).orderByChild('created').limitToLast(10) : []
}
    subs()  {
      return [{
        subKey: 'totoguess',
        asList: true,
        forEachChild: {
          childSubs: (childKey, childVal) => {
            return [{
              subKey: 'post_'+childKey,
              asValue: true,
              path: 'posts/'+childKey
            }]
          }
        },
        path: 'totoguess/' + this.user.uid
      }]
 
   } 

create_toto(guess) {
    	this.child(toto_subkey).push(guess);
    }
    
get_toto() {
        return this.getData(toto_subkey);
    }

    alltotoSubs() {
        return [{
            subKey: toto_subkey,
            asList: true
        }];
    }

}