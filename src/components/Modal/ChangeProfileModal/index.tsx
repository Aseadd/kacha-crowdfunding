import { Button, Modal, Slider } from "antd";
import RoundedCloseIcon from "src/components/Icons/RoundedCloseIcon";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import ZoomIcon from "src/components/Icons/ZoomIcon";
import RotateIcon from "src/components/Icons/RotateIcon";
import getCroppedImg from "src/utilities/image";
import { useUpdateProfileImageMutation } from "src/api/data";
import { useNotificationContext } from "src/context/NotificationContext";
import { IUserResponse } from "src/model/auth";
import { useDispatch } from "react-redux";
import { setProfileImage } from "src/store/states/auth";

interface IProps {
    open: boolean;
    handleClose: () => void;
    imageSrc: string;
}
export default function ChangeProfileModal({ handleClose, open, imageSrc }: IProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [updateProfileImageAction, { isLoading }] = useUpdateProfileImageMutation();
    const { showError, showSuccess } = useNotificationContext();
    const dispatch = useDispatch();

    const uploadImage = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels!, rotation);
            if (croppedImage) {
                const response: IUserResponse = await updateProfileImageAction(croppedImage).unwrap();
                if (response.status_code < 300) {
                    showSuccess({ message: "Profile image updated successfully" });
                    dispatch(setProfileImage(response.data.profile!));
                    handleClose();
                } else showError({ message: response.message ?? "Network error" });
                console.log(response);
            } else showError({ message: "Failed to get profile image" });
        } catch (error: any) {
            showError({ message: error?.data?.detail ?? error ?? "Network error" });
        }
    };

    const onClose = () => {
        handleClose();
    };
    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    return (
        <Modal open={open} footer={null} closeIcon={null} closable={false} centered style={{ maxWidth: "544px" }} width="100%">
            <div className="w-full px-2 py-1 flex flex-col gap-y-8">
                <div className="w-full flex justify-end items-center">
                    <button className="outline-none" onClick={handleClose}>
                        <RoundedCloseIcon />
                    </button>
                </div>
                <div className="w-full flex flex-col gap-y-8">
                    <h3 className="text-[#23262F] text-2xl font-medium text-center">Edit Photo</h3>
                    <div className="w-full flex flex-col gap-y-8">
                        <div className="w-full max-w-[440px] h-[218.286px] bg-[#CDF] rounded-xl overflow-hidden relative mx-auto">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropSize={{ height: 171.429, width: 171.429 }}
                                cropShape="round"
                                rotation={rotation}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div className="w-full flex gap-x-1 items-center">
                                <ZoomIcon />
                                <Slider
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onChange={(e) => setZoom(e)}
                                    className="max-w-[151px] w-full profile"
                                />
                                <span className="text-[#484C56] font-normal text-xs">{zoom.toFixed(1)}</span>
                            </div>
                            <div className="w-full flex gap-x-1 items-center">
                                <RotateIcon />
                                <Slider
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    onChange={(e) => setRotation(e)}
                                    className="max-w-[151px] w-full profile"
                                />
                                <span className="text-[#484C56] font-normal text-xs">{rotation.toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center gap-x-4">
                        <Button
                            onClick={uploadImage}
                            loading={isLoading}
                            className="h-auto w-full hover-white bg-primary py-4 text-white rounded-[50px] text-base font-semibold">
                            Done
                        </Button>
                        <Button
                            onClick={onClose}
                            className="h-auto w-full border-none py-4 bg-[#F1F1F1] text-[#23262F] rounded-[50px] text-base font-semibold">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
