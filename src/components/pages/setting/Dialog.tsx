"use client";

import React, { Dispatch, FC, SetStateAction } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { convertCamelCase } from '@/utils/utils';
import { ISettingsState, setSettingsState } from '@/redux/features/settings/settingsSlice';
import Combobox, { IOption } from '@/components/ui/combobox';

interface ISettingDialogProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const SettingDialog: FC<ISettingDialogProps> = ({ open, setOpen }) => {
    const settings = useAppSelector(state => state.settings);
    const settingsKeys = Object.keys(settings) as Array<keyof ISettingsState>;
    const dispatch = useAppDispatch();
    const settingsSelectValues = {
        replayKey: [
            { value: "Control", label: "Ctrl" },
            { value: "Shift", label: "Shift" },
            { value: "Alt", label: "Alt" },
        ],
        autoReplay: [
            { value: "0", label: "No" },
            { value: "1", label: "1 time" },
            { value: "2", label: "2 times" },
            { value: "3", label: "3 times" },
        ],
        timeBetweenReplays: [
            { value: "500", label: "0.5 seconds" },
            { value: "1000", label: "1 second" },
            { value: "1500", label: "1.5 seconds" },
            { value: "2000", label: "2 seconds" },
        ],
        showExplanationBeforeComplete: [
            { value: "false", label: "No" },
            { value: "true", label: "Yes" },
        ],
        wordSuggestions: [
            { value: "true", label: "Enable" },
            { value: "false", label: "Disable" },
        ],
    };

    const handleSaveSettings = (key?: any, value?: string) => {
        let settingValue;

        if (typeof (Number(value) - 0) === "number" && !isNaN((Number(value) - 0))) {
            settingValue = Number(value);
        } else if (value === "true" || value === "false") {
            settingValue = Boolean(value);
        } else {
            settingValue = value;
        }

        dispatch(setSettingsState({
            ...settings,
            [key]: settingValue
        }));
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>

                <table className='border-collapse border border-gray-300 w-full'>
                    <tbody>
                        {settingsKeys.map((key, index) => {
                            return (
                                <tr key={index}>
                                    <th className='text-start p-3 border'>{convertCamelCase(key)}</th>
                                    <td className='w-[30%] border p-3'>
                                        <Combobox options={settingsSelectValues[key] as IOption[]} onSelect={(value) => handleSaveSettings(key, value)} defaultValue={settings[key]?.toString()} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </DialogContent>
        </Dialog>
    )
}

export default SettingDialog