<?php

namespace App\Http\Controllers;

use App\Models\Twin;
use App\Models\TwinAnswer;
use Illuminate\Http\Request;

class TwinController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }   

    public function twin(Request $request) {
        $validatedData = $request->validate([
            "text" => "required"
        ], [
            "text.required" => "Texto necesario"
        ]);

        $twin = new Twin();

        $twin->user_id = auth()->user()->id;
        $twin->owner = auth()->user()->username;
        $twin->text = $request->text;
        $twin->likes = 0;
        $twin->comments = 0;

        $twin->save();

        return response()->json(['message' => "Twin post"]);
    }


    public function twinAnswer(Request $request, $twin_id) {
        $validatedData = $request->validate([
            "text" => "required"
        ], [
            "text" => "Texto necesario."
        ]);

        $twinAnswer = new TwinAnswer();

        $twinAnswer->user_id = auth()->user()->id;
        $twinAnswer->owner = auth()->user()->username;
        $twinAnswer->twin_id = $twin_id;
        $twinAnswer->text = $request->text;


        $twin = Twin::find($twinAnswer->twin_id);

        if(!$twin) {
            return response()->json(["message" => "Twin inexistente."], 400);
        }

        $twinAnswer->save();

        return response()->json(['message' => "Answer twin post"]);
    }
}
