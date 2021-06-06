export default function ({ $auth }) {
    //KEEP USER ALIVE WHEN PAGE IS REFRESHED IF USER LOGGEDIN
    if (
            $auth.$storage.getCookie(process.env.AUTH_KEY) !== null || 
            $auth.$storage.getCookie(process.env.AUTH_KEY) !== ''   || 
            typeof $auth.$storage.getCookie(process.env.AUTH_KEY) !== 'undefined'
        ) 
        {
            
       return $auth.setUser($auth.$storage.getCookie(process.env.AUTH_KEY))
    }
  
}