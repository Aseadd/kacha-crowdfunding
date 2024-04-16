import { Button, Spin } from "antd";
import UploadIcon from "src/components/Icons/UploadIcon";
import InputWithLabel from "src/components/Form/InputWithLabel";
import ChangePasswordModal from "src/components/Modal/ChangePasswordModal";
import ChangeProfileModal from "src/components/Modal/ChangeProfileModal";
import { imageUrl } from "src/utilities/image";
import useProfile from "src/hooks/useProfile";

export default function Profile() {
    const hook = useProfile();

    return (
        <main className="w-full max-xs:px-2 max-xs:py-3 xs:pt-10 xs:pb-24">
            {hook.loading ? (
                <div className="w-full flex min-h-screen justify-center items-center p-10">
                    <Spin tip="" size="large"></Spin>
                </div>
            ) : (
                <div className="w-full flex">
                    <div className="grow"></div>
                    <div className="w-full flex flex-col gap-y-[30px] max-w-[465px]">
                        <div className="w-full flex flex-col gap-y-8">
                            <h1 className="text-black font-normal text-base xs:text-[32px] md:hidden">User Profile</h1>
                            <h6 className="text-[#4C535F] font-medium text-xs xs:text-base">Profile Photo</h6>
                            <div className="flex flex-col gap-y-6 xs:flex-row w-full gap-x-8 items-center">
                                <div className="outline-none w-[130px] h-[132px] flex justify-center items-center rounded-[18px] border border-dashed border-[#4C535F] bg-[#FAFBFC] overflow-hidden">
                                    {hook.user?.profile ? (
                                        <img src={imageUrl(hook.user.profile)!} alt="" />
                                    ) : (
                                        <div className="w-full flex flex-col items-center px-4">
                                            <UploadIcon />
                                            <p className="mt-4 font-medium text-[#4C535F] text-center text-sm">Upload your photo</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-row xs:flex-col gap-y-6 max-xs:justify-between max-xs:w-full gap-x-5">
                                    <Button className="max-xs:w-full bg-[#FCFCFD] rounded-xl p-0 text-sm font-medium text-[#000000cc] border border-[#DFDFE6]">
                                        <label htmlFor="profile" className="w-full px-[15px] inline-block">
                                            Change Photo
                                        </label>
                                    </Button>
                                    <input type="file" className="hidden" id="profile" onChange={hook.onFileChange} accept="image/*" />

                                    {hook.imageSrc && (
                                        <ChangeProfileModal
                                            imageSrc={hook.imageSrc}
                                            open={hook.changeProfile}
                                            handleClose={hook.handleCloseChangeProfile}
                                        />
                                    )}
                                    <Button
                                        loading={hook.removeProfileLoading}
                                        onClick={hook.removeProfileImage}
                                        className="max-xs:w-full bg-[#FCFCFD] rounded-xl text-sm font-medium text-primary border border-primary">
                                        Remove{" "}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-[#E0E4EC]"></div>
                        <div className="w-full flex flex-col gap-y-8">
                            <div className="w-full flex flex-col gap-y-8">
                                <p className="text-[#4C535F] text-xs xs:text-base font-medium">Personal Information</p>
                                <div className="w-full flex flex-col gap-y-[30px]">
                                    <InputWithLabel
                                        control={hook.control}
                                        name="fullName"
                                        label="Full name"
                                        type="text"
                                        placeholder="Full name here"
                                    />
                                    <InputWithLabel
                                        control={hook.control}
                                        disabled
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="Email herr"
                                    />
                                    <div className="w-full gap-y-[30px] flex flex-col xs:flex-row gap-x-11">
                                        <InputWithLabel
                                            disabled
                                            control={hook.control}
                                            name="phone"
                                            label="Phone number"
                                            type="tel"
                                            placeholder="Phone number here"
                                        />
                                        <InputWithLabel
                                            control={hook.control}
                                            name="address"
                                            label="Address"
                                            type="text"
                                            placeholder="Address here"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-[#E0E4EC]"></div>
                        <div className="w-full flex flex-col gap-y-8">
                            <p className="text-[#4C535F] text-xs xs:text-base font-medium">Password</p>
                            <Button
                                onClick={hook.handleOpenChangePassword}
                                className="w-full h-auto text-[#000000cc] text-sm xs:text-base font-semibold text-center max-xs:py-3 p-4 border border-[#DFDFE6] bg-[#FCFCFD] rounded-xl">
                                Change Password
                            </Button>
                            <ChangePasswordModal open={hook.changePassword} handleClose={hook.handleCloseChangePassword} />
                        </div>
                        <div className="w-full h-[1px] bg-[#E0E4EC]"></div>
                        <Button
                            loading={hook.isLoading}
                            onClick={hook.handleSubmit(hook.onSubmit)}
                            className="w-full h-auto text-[#000000cc] text-sm xs:text-base font-semibold text-center max-xs:py-3 p-4 border border-[#DFDFE6] bg-[#BCBEC0] rounded-xl">
                            Save
                        </Button>
                    </div>
                    <div className="grow md:grow-[4]"></div>
                </div>
            )}
        </main>
    );
}
