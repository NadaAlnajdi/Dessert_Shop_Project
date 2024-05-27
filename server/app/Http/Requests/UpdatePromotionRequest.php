<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\UniquePromotionProduct;

class UpdatePromotionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'sometimes|required|string|min:3|max:255',
            'description' => 'nullable|string',
            'discount' => 'sometimes|required|numeric|min:0|max:100',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'is_active' => 'sometimes|required|boolean',
            'products' => ['sometimes', 'required', 'array', new UniquePromotionProduct($this->route('slug'))],
            'products.*' => 'exists:products,id',
        ];
    }
}
