<?php

namespace App\Http\Controllers;

class ResponseHelper
{
    public function formatInnerOuterArray(&$equipment)
    {
        if (count($equipment) > 0) {
            $toDeleteIndices = $this->indicesToEditOuterInnerEquip($equipment);
            if ($toDeleteIndices <> 0) {
                $this->clearRepeatedOuterEquipFields($equipment, $toDeleteIndices);
            }

            $this->AddEmptyRowsOuterInnerEquip($equipment);
            $this->shiftDownByOneRowInner($equipment);
            $this->replaceAllNullValues($equipment);
            $this->mergeColumns($equipment);

        }
    }

    public function indicesToEditOuterInnerEquip(&$equipment)
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

    public function clearRepeatedOuterEquipFields(&$equipment, &$toClearKeys)
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

    public function shiftDownByOneRowInner(&$equipment)
    {
        $InnerEquipFieldsToShift = array('inner_name', 'factory_number_inner', 'quant',
            'year_issue_inner', 'state_tech_condition_inner', 'id_inner_equip');
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

    public function mergeColumns(&$equipment)
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

    public function addEmptyRow(&$equipment, $indexToInsert)
    {
        $equipmentClone = clone $equipment[0];
        foreach ($equipmentClone as &$key) {
            $key = "";
        }
        $emptyItem = array($equipmentClone);

        $equipment->splice($indexToInsert, 0, $emptyItem);

        return $equipment;
    }


    public function AddEmptyRowsOuterInnerEquip(&$equipment)
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


    public function replaceAllNullValues(&$equipment)
    {
        foreach ($equipment as &$item) {
            foreach ($item as &$valueEquip) {
                if (($valueEquip) == null) $valueEquip = "";
            }
        }
    }

}
