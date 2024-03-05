<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;



class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'verify']]);
    }

    public function register(Request $request) {
        $validatedData = $request->validate([
            'email' => 'required|email|unique:users,email',
            'username' => 'required|min:6|max:40|unique:users,username',
            'password' => 'required|min:6',
        ], [
            'email.required'=> 'El email es necesario.',
            'email.email'=> 'Ingrese un correo válido.',
            'email.unique'=> 'El correo electrónico ya está en uso.',
            'username.required'=> 'El usuario es necesario.',
            'username.min'=> 'Mínimo 6 caracteres.',
            'username.max'=> 'Máximo 40 caracteres.',
            'username.unique'=> 'El usuario no está disponible.',
            'password.required'=> 'La contraseña es necesaria.',
            'password.min'=> 'Mínimo 6 caracteres.'
        ]);

        $user = new User();

        $user->email = strtolower($request->email);
        $user->username = strtolower($request->username);
        $user->password = Hash::make($request->password);
        $user->remember_token = Str::random(40);

        $user->save();

        // Importante para la verificacion de email, usa Mail:: to (para) $user->email (el correo que se guardo en el nuevo objeto user) y send (enviar) al mismo correo pero ahora usando su clase RegisterMail para manejar el envio de correo (ver Http/Mail/RegisterMail.php)
        Mail::to($user->email)->send(new RegisterMail($user));

        return response()->json(["message" => "The user has been successfully created. Please check your email inbox to verify your email address.", $user], 201);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ], [
            "username.required" => "El usuario es necesario.",
            "password.required" => "La contraseña es necesaria."
        ]);



        $credentials = request(['username', 'password']);

        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Credenciales incorrectas.'], 404);
        }

        $user = User::where('username', $request->username)->first();


        if ($user->email_verified_at == null) {
            return response()->json(['error' => 'Por favor, verifica tu correo electrónico para activar tu cuenta'], 404);
        }

        return $this->respondWithToken(auth()->attempt($credentials));
    }



    public function profile()
    {
       return response()->json(auth()->user());
    }

    public function getToken() {
        $user = auth()->user();
        $id = $user->id;
        $token = auth()->tokenById($id);
        return response()->json($token);
    }



    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }




    protected function respondWithToken($token)
    {

        $ttl = config('jwt.ttl');

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $ttl * 60
        ]);
    }



    public function verify($token) {
        $user = User::where('remember_token', '=', $token)->first();

        if(empty($user)) {
            return response()->json(['notfound' => 'Correo no encontrado.'], 404);
        }
        $user->email_verified_at = date('d-m-Y H:i:s');
        $user->remember_token = Str::random(40);
        $user->save();
        return response()->json(['success' => 'Correo verificado con exito.'], 200);
    }
}
