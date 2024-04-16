import { Button } from "antd";

export default function FAQDetail() {
    return (
        <main className="w-full border-b border-b-[#CBD4E6] max-xs:py-8 pb-[52px] mb-6 max-xs:px-2 max-md:px-8">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="w-full flex flex-col max-md:flex-col-reverse md:flex-row items-start gap-x-32">
                    <div
                        className="flex flex-col gap-y-[30px] py-10 px-8 mt-[68px] w-full md:w-[273px] rounded-md border border-[#F3F3F3] bg-white"
                        style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
                        <h6 className="text-[#140342] text-[20px] font-medium text-center">Related topics</h6>
                        <div className="w-full flex max-xs:flex-col flex-row md:flex-col gap-y-[30px] text-[#323232cc] text-lg font-normal">
                            <div className="w-full flex flex-col gap-y-[30px] max-md:items-center text-[#323232cc] text-lg font-normal">
                                <p className="underline">Lorem ipsum dolor sit</p>
                                <p className="underline">Lorem ipsum dolor sit</p>
                            </div>
                            <div className="w-full flex flex-col gap-y-[30px] max-md:items-center text-[#323232cc] text-lg font-normal">
                                <p className="underline">Lorem ipsum dolor sit</p>
                                <p className="underline">Lorem ipsum dolor sit</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[692px] flex flex-col gap-y-5 xs:mt-[68px]">
                        <h3 className="text-black text-2xl xs:text-[32px] font-semibold">Requirements to receive funds</h3>
                        <p className="text-sm xs:text-base font-light text-black">Last update - Oct 22, 2023</p>
                        <div className="bg-red-300 w-full">
                            <video
                                controls
                                width={"100%"}
                                src="https://media.istockphoto.com/id/589001754/video/moai-at-ahu-tongariki-with-night-sky-and-milky-way-background-easter-island-chile.mp4?s=mp4-640x640-is&k=20&c=4Ti83sgRer_qC0r9-B9G6XB_WT2JLhGTOnH_rD6N0gI="
                            />
                        </div>
                        <div className="text-base md:text-lg font-normal text-black">
                            <p className="">
                                Lorem ipsum dolor sit amet consectetur. Ultricies fames diam quis nunc. Adipiscing et tristique venenatis
                                arcu integer vestibulum. Sit ullamcorper quis cursus ut tortor sed scelerisque. Sit morbi nunc et velit. Sed
                                quis nunc aenean ultrices tellus hendrerit magnis malesuada. Nisl diam cras id lacus dignissim porta. Nunc
                                sit quis ac tristique dis quam. Malesuada volutpat tempus volutpat vehicula mauris eu donec.
                            </p>
                            <br />
                            <p className="text-black text-lg font-bold">
                                This article will only be applicable to a representative of the charity, since the fundraiser organizer will
                                not be able to complete the enrollment themselves.
                            </p>
                            <br />
                            <h5 className="text-black text-2xl font-bold">Some subtitle can goes here</h5>
                            <br />
                            <p className="">
                                Lobortis etiam imperdiet dignissim tincidunt orci sollicitudin consequat nec massa. Amet scelerisque
                                adipiscing fermentum tellus pellentesque praesent a semper tortor. Mattis sed nisl odio vulputate. Iaculis
                                at adipiscing ac semper adipiscing.
                            </p>
                            <br />
                            <ol className=" list-decimal ml-8">
                                <li>Laoreet dictum tortor pharetra etiam eget. </li>
                                <li>Commodo enim risus ac ac nunc consectetur nascetur. </li>
                                <li>Nisi consequat id sed volutpat id ridiculus a.</li>
                            </ol>
                            <br />
                            <p className="">
                                Montes suspendisse eget et vestibulum nibh sagittis donec. Leo nibh senectus ac ornare gravida quam.
                                Adipiscing vulputate lorem aliquam accumsan. Magna vestibulum felis quis integer pellentesque ornare congue.
                                Non tortor sit eu arcu vulputate. Nibh quis imperdiet at rhoncus dui est. Urna placerat id at ultricies
                                elit. Ullamcorper vel aliquam mauris varius vehicula fusce integer integer varius. Lectus mattis cursus sed
                                massa sit consectetur fames dignissim. Eu tortor etiam feugiat turpis non vel vulputate. Non nec luctus
                                quisque donec sed. Turpis malesuada elit commodo mauris libero massa vulputate tincidunt enim. Malesuada
                                tellus tincidunt pharetra tristique proin elementum ullamcorper egestas lacus. Nam quis et cras eu a non
                                dignissim sit.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full mx-auto mt-24 max-w-[995px] px-2 xs:px-6 py-6 xs:py-[52px] rounded-xl bg-[#FFF9E7] flex flex-col gap-y-3 xs:flex-row items-center justify-between text-center xs:text-start">
                    <div className="w-full flex flex-col gap-y-[6px]">
                        <h4 className="text-primary text-base xs:text-[20px] font-semibold">Still have questions?</h4>
                        <p className="text-sm xs:text-base font-normal text-[#323232]">
                            Can’t find the answer you’re looking for? Please chat our friendly team.
                        </p>
                    </div>
                    <Button
                        className="max-xs:w-full hover-white bg-primary text-white text-sm font-semibold py-2 px-4 rounded-[6px] h-auto"
                        style={{ boxShadow: "0px 0.73544px 1.47088px 0px rgba(16, 24, 40, 0.05)" }}>
                        Get in touch
                    </Button>
                </div>
            </div>
        </main>
    );
}
