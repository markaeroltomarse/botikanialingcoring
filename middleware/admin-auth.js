export default ({$auth, redirect}) => {
    try{
        console.log('MIddle ware auth')
        if(!$auth.loggedIn){
            return redirect('/login')  
        }
    }catch(err){
        console.log(err)
        return redirect('/')
    }
}