export default  () => {
    return <div>
        <div>
            <div style={{marginRight: '0.5rem'}}><input type="radio" name="subscriptionType"  />prepaid<label htmlFor="prepaid">prepaid</label></div>
            <div style={{marginRight: '0.5rem'}}><input type="radio" name="subscriptionType"  />postpaid<label htmlFor="postpaid">postpaid</label></div>
            <div style={{marginRight: '0.5rem'}}><input type="radio" name="subscriptionType"  />skitto<label htmlFor="skitto">skitto</label></div>
        </div>
        <div>
            <input type="number" name="" id="" /><img src="" alt="" />
        </div>
        <div>
            <div>
                <NavLink>Amount</NavLink>
                <NavLink>Drive</NavLink>
                <NavLink>Regular</NavLink>
            </div>
            <div>
                <Column>
                    <AmountOption>20</AmountOption>
                    <AmountOption>50</AmountOption>
                    <AmountOption>100</AmountOption>
                    <AmountOption>150</AmountOption>
                </Column>
                <div>
                    <inputNumber type="number" name="" placeholder="0" />
                    <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>
}
