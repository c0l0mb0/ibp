<?php

namespace App\Http\Controllers;

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
        $outerEquipments = OuterEquipment::all();
//            return response()->json($outerEquipments);
//        }else{
        return response()->json('access denied');
//        }


    }

//    public function indexOuterAndInner()
//    {
//        $outerEquipments = DB::table('outer_equipment')
//            ->select('outer_equipment.*', 'inner_equipment.*')
//            ->join('inner_equipment', 'outer_equipment.id_outer_equip', '=', 'inner_equipment.id_outer')
//            ->get();
//        print_r($outerEquipments);
////        return response()->json($outerEquipments);
//
//    }

    public function listOfOuterObjects()
    {
        $outerEquipments = DB::table('outer_equipment')
            ->select('place_first_lev')
            ->get();
        return response()->json($outerEquipments);

    }


    private function indicesToEditOuterInnerEquip(&$equipment)
    {
        $toDeleteLines = array();
        $itemCompare = 0;
        foreach ($equipment as $key => &$item) {

            if ($itemCompare == $item->id_outer_equip) {
                array_push($toDeleteLines, $key);
            }
            $itemCompare = $item->id_outer_equip;
        }
        return $toDeleteLines;
    }

    private function clearRepeatedOuterEquipFields(&$equipment, &$toClearKeys)
    {
        $fieldsToClear = array('place_zero_lev', 'place_first_lev', 'place_third_lev',
            'affiliate', 'equip_name', 'factory_number_outer',
            'year_issue_outer', 'state_tech_condition_outer');
        foreach ($toClearKeys as &$toClearKey) {
            foreach ($fieldsToClear as &$fieldToClear) {
                $equipment[$toClearKey]->$fieldToClear = "";
            }

        }
        return $equipment;
    }

    private function shiftDownByOneRowInner(&$equipment)
    {
        $InnerEquipFieldsToShift = array('inner_name', 'factory_number_inner', 'quant',
            'year_issue_inner', 'state_tech_condition_inner');
        $tmp = "";

        for ($i = count($equipment) - 1; $i > 0; $i--) {
            foreach ($InnerEquipFieldsToShift as &$InnerEquipFieldToShift) {
                $equipment[$i]->$InnerEquipFieldToShift = $equipment[$i - 1]->$InnerEquipFieldToShift;
            }

        }
        foreach ($InnerEquipFieldsToShift as &$InnerEquipFieldToShift) {
            $equipment[0]->$InnerEquipFieldToShift = "";
        }

        return $equipment;
    }

    private function mergeColumns(&$equipment)
    {
        $columnsToMergeСouples = array(
            array("factory_number_inner", "factory_number_outer", "factory_number"),
            array("year_issue_inner", "year_issue_outer", "year_issue"),
            array("state_tech_condition_inner", "state_tech_condition_outer", "state_tech_condition"));

        for ($i = 0; $i < count($equipment); $i++) {
            foreach ($columnsToMergeСouples as $columnsToMergeСouple) {

                $columnsToMergeСoupleInner = $columnsToMergeСouple[0];
                $columnsToMergeСoupleOuter = $columnsToMergeСouple[1];
                $columnsToMergeСoupleNewField = $columnsToMergeСouple[2];

                if ($equipment[$i]->$columnsToMergeСoupleInner !== "") {
                    $equipment[$i]->$columnsToMergeСoupleNewField = $equipment[$i]->$columnsToMergeСoupleInner;
                } else {
                    $equipment[$i]->$columnsToMergeСoupleNewField = "";
                }
                if ($equipment[$i]->$columnsToMergeСoupleOuter !== "") {
                    $equipment[$i]->$columnsToMergeСoupleNewField = $equipment[$i]->$columnsToMergeСoupleOuter;
                }

            }

        }
        return $equipment;
    }

    private function addEmptyRow(&$equipment, $indexToInsert)
    {
        $equipmentClone = clone $equipment[0];
        foreach ($equipmentClone as &$key) {
            $key = "";
        }
        $emptyItem = array($equipmentClone);

        $equipment->splice($indexToInsert, 0, $emptyItem);

        return $equipment;
    }


    private function AddEmptyRowsOuterInnerEquip(&$equipment)
    {
        $itemCompare = 0;
        $repeatedOuterIndex = 0;

        for ($i = 0; $i < count($equipment); $i++) {
            if ($itemCompare == $equipment[$i]->id_outer_equip) {
                $repeatedOuterIndex = $equipment[$i]->id_outer_equip;
                if ($i == count($equipment) - 1) { //if last element in array
                    $i++;
                    $this->addEmptyRow($equipment, $i);
                }
            } else {
                if ($repeatedOuterIndex == $itemCompare &&
                    $repeatedOuterIndex !== 0) { //not first element
                    $this->addEmptyRow($equipment, $i);
                    $i++;
                }
            }
            $itemCompare = $equipment[$i]->id_outer_equip;
        }
        return $equipment;
    }

//    private function addRowsOuterEquipFields(&$Equipment, &$toAddNewRowIndices)
//    {
//        $fieldsToClear = array('place_zero_lev', 'place_first_lev', 'affiliate', 'equip_name', 'factory_number_outer',
//            'year_issue_outer', 'state_tech_condition_outer');
//        foreach ($toDeleteKeys as &$toClearKey) {
//            foreach ($fieldsToClear as &$fieldToClear) {
//                $Equipment[$toClearKey]->$fieldToClear = "";
//            }
//
//        }
//        return $Equipment;
//    }

    public function replaceAllNullValues(&$equipment)
    {
        foreach ($equipment as &$item) {
            foreach ($item as &$valueEquip) {
                if (($valueEquip) == null) $valueEquip = "";
            }
        }
    }

    public function indexOuterAndInner()
    {
        $outerEquipment = DB::table('outer_equipment')
            ->select(DB::raw('id_outer_equip , id_inner_equip, place_zero_lev, place_first_lev, place_third_lev, affiliate,
	equip_name,  inner_name, outer_equipment.factory_number as factory_number_outer ,
	inner_equipment.faсtory_number as factory_number_inner,
	quant, inner_equipment.year_issue as year_issue_inner, outer_equipment.year_issue as year_issue_outer,
	inner_equipment.state_tech_condition as state_tech_condition_inner,
	outer_equipment.state_tech_condition as state_tech_condition_outer'))
            ->leftJoin('inner_equipment', 'outer_equipment.id_outer_equip', '=', 'inner_equipment.id_outer')
            ->orderBy('id_outer_equip', 'ASC')
            ->get();

        $toDeleteIndices = $this->indicesToEditOuterInnerEquip($outerEquipment);
        $this->clearRepeatedOuterEquipFields($outerEquipment, $toDeleteIndices);
        $this->AddEmptyRowsOuterInnerEquip($outerEquipment);

        $this->shiftDownByOneRowInner($outerEquipment);
        $this->replaceAllNullValues($outerEquipment);
        $this->mergeColumns($outerEquipment);


        return response()->json($outerEquipment);

    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'factory_number' => 'required'
        ]);

        $outerEquipment = OuterEquipment::create($request->all());

        return response()->json($outerEquipment);
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

}
