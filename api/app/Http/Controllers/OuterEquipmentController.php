<?php

namespace App\Http\Controllers;

use App\Buildings;
use App\OuterEquipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OuterEquipmentController extends Controller
{


    /**
     * Create a new controller instance.
     *
     * @return void
     */


    public function index(Request $request)
    {
//        isset($_SESSION['userId']) && $_SESSION['userId'] != '';

//        if ($request->session()->get('id')!="") {
        $outerEquipments = OuterEquipment::all()->sortBy("id_outer_equip");
//        $outerEquipments;
        return response()->json($outerEquipments);
//        }else{
//        return response()->json('access denied');
//        }


    }

    public function indexBuildingOuterAndInner()
    {
        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('id_outer_equip , id_inner_equip, place_zero_lev, place_first_lev, place_third_lev, affiliate,
	equip_name,  inner_name, outer_equipment.factory_number as factory_number_outer ,
	inner_equipment.faсtory_number as factory_number_inner,
	quant, inner_equipment.year_issue as year_issue_inner, outer_equipment.year_issue as year_issue_outer,
	inner_equipment.state_tech_condition as state_tech_condition_inner,
	outer_equipment.state_tech_condition as state_tech_condition_outer'))
            ->leftJoin('inner_equipment', 'outer_equipment.id_outer_equip', '=', 'inner_equipment.id_outer')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id_build')
            ->orderBy('id_outer_equip', 'ASC')
            ->get();
        $responseHelper = new ResponseHelper();
        $responseHelper->formatInnerOuterArray($outerEquipment);


        return response()->json($outerEquipment);

    }


    public function indexBuildingOuterInnerByFirstLevValue(Request $request)
    {
        $this->validate($request, [
            'place_first_lev' => 'required'
        ]);

        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('id_outer_equip , id_inner_equip, place_zero_lev, place_first_lev, place_third_lev, affiliate,
	equip_name,  inner_name, outer_equipment.factory_number as factory_number_outer ,
	inner_equipment.faсtory_number as factory_number_inner,
	quant, inner_equipment.year_issue as year_issue_inner, outer_equipment.year_issue as year_issue_outer,
	inner_equipment.state_tech_condition as state_tech_condition_inner,
	outer_equipment.state_tech_condition as state_tech_condition_outer'))
            ->leftJoin('inner_equipment', 'outer_equipment.id_outer_equip', '=', 'inner_equipment.id_outer')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id_build')
            ->where('place_first_lev', $request->place_first_lev)
            ->orderBy('id_outer_equip', 'ASC')
            ->get();

        $responseHelper = new ResponseHelper();
        $responseHelper->formatInnerOuterArray($outerEquipment);


        return response()->json($outerEquipment);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'factory_number' => 'required',
            'equip_name' => 'required'
        ]);

        $outerEquipment = OuterEquipment::create($request->all());

        return response()->json($outerEquipment);
    }

    public function createWithLocation(Request $request)
    {
        $this->validate($request, [
            'factory_number' => 'required',
            'equip_name' => 'required',
            'place_first_lev' => 'required',
            'place_third_lev' => 'required'
        ]);


        if (OuterEquipment::where('factory_number', $request->factory_number)->exists()) {
            return ('factory_number already exists');
        } else {
            $building = new Buildings;
            $building->place_first_lev = $request->place_first_lev;
            $building->place_third_lev = $request->place_third_lev;
            $building->place_zero_lev = $request->place_zero_lev;
            $building->save();

            $requestArray = $request->all();
            $requestArray['id_build'] = $building->id_build;
            $outerEquipmnet = OuterEquipment::create($requestArray);
            return response()->json('equipment added successfully');
        }
    }

    public function show($id)
    {
        $outerEquipment = OuterEquipment::find($id);

        return response()->json($outerEquipment);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'factory_number' => 'required'
        ]);

        $outerEquipment = OuterEquipment::find($id);

        $outerEquipment->update($request->all());

        return response()->json($outerEquipment);
    }

    public function destroy($id)
    {
        $outerEquipment = OuterEquipment::find($id);
        $outerEquipment->delete();

        return response()->json('OuterEquipment removed successfully');
    }

    public function destroyOuterEquipAndItsLocation($id)
    {
        $outerEquipment = OuterEquipment::find($id);
        $outerEquipment->delete();

        $building = Buildings::find(intval($outerEquipment->id_outer_equip));
        $building->delete();

        return response()->json('OuterEquipment removed successfully');

    }

}
