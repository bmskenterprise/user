import {Section} from './Elements';
import AccountList from '../../Account.json'
import List from '../components/List';

export default ()=>{
        return <Section>
            <div>
                <div style={{width: '33%'}}>
                    <h4>My Account</h4>
                </div>
                <div style={{width: '33%'}}>
                    <h4>My Balance</h4>
                </div>
                <div style={{width: '33%'}}>
                    <h4>My Level</h4>
                </div>
            </div>
            <List list={AccountList} />
        </Section>
}
