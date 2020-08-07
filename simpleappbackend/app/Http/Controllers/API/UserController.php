<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
   
class UserController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $checkEmail = User::where('email',$request->email)->first();

        if($checkEmail)
        return $this->sendError('Email Already Exists.', 'Email Already Exists.'); 

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;
        $success['last_name'] =  $user->last_name;
        $success['id'] =  $user->id;
   
        return $this->sendResponse($success, 'User register successfully.');
    }
   
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')-> accessToken; 
            $success['name'] =  $user->name;
            $success['last_name'] =  $user->last_name;
            $success['id'] =  $user->id;
            
            return $this->sendResponse($success, 'User login successfully.');
        } 
        else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }

    /**
     * Get All Users api
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllUsers ($user_id) {
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            $users = User::where('id','!=',$user_id)->get();
            return $this->sendResponse($users, 'All users retreived');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }

    /**
     * Get User By Id api
     *
     * @return \Illuminate\Http\Response
     */

    public function getUserById ($user_id){
        try {
            $user = User::where('id',$user_id)->first();
            if(empty($user))
                return $this->sendError("Could not find User", [], 400);
            return $this->sendResponse($user, 'user retreived');
        } catch (Exception $e) {
            return $this->sendError('Exception', $e->getMessage(), 400);
        }
    }
}