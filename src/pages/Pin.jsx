import {Header} from '../components/styled'     
export default  () =>{
    return <div style={{width:'100%',height:'100%'}}>
        <Header theme={themeData}>
                <div><Avatar src={appData?.avatar} onClick={e=>setAdminProfileCard(prev=> !prev)} />
          {adminProfileCard && <AdminProfile />}
          </div>
        </Header>
        {children}
        </div>
}
