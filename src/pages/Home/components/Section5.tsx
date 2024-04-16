import lock from "src/assets/svg/primary-lock.svg";
import trusted from "src/assets/svg/trusted.svg";
import handshake from "src/assets/svg/handshake.svg";
export default function Section5() {
    return (
        <section className="px-8 md:px-0 py-16 w-full bg-white">
            <div className="max-w-[1180px] mx-auto w-full flex flex-col gap-y-8 md:gap-y-16">
                <h1 className="text-secondary text-center text-base xs:text-2xl md:text-[34px] font-bold uppercase">Why choose us</h1>
                <div className="flex flex-col xs:flex-row gap-y-12 xs:gap-x-[68px] items-center">
                    <div className="w-full flex flex-col gap-y-4 md:gap-y-6 text-center">
                        <div className="flex justify-center">
                            <img src={trusted} alt="" />
                        </div>
                        <h6 className="text-secondary font-bold text-sm xs:text-base md:text-2xl">Verified Campaigns</h6>
                        <p className="text-[#423D3D] text-xs md:text-lg font-normal max-xs:max-w-[246px] max-xs:mx-auto">
                            Lorem ipsum dolor sit amet consectetur. Ac amet risus velit sit id consectetur vitae facilisi ac. In enim et
                            arcu sit interdum
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-y-4 md:gap-y-6 text-center">
                        <div className="flex justify-center">
                            <img src={handshake} alt="" />
                        </div>
                        <h6 className="text-secondary font-bold text-sm xs:text-base md:text-2xl">Unwavering Trust</h6>
                        <p className="text-[#423D3D] text-xs md:text-lg font-normal max-xs:max-w-[246px] max-xs:mx-auto">
                            Lorem ipsum dolor sit amet consectetur. In dui lobortis et sed nec ultricies lacus. Potenti quis sit mi
                            dignissim in cursus lor
                        </p>
                    </div>
                    <div className="w-full flex flex-col gap-y-4 md:gap-y-6 text-center">
                        <div className="flex justify-center">
                            <img src={lock} alt="" />
                        </div>
                        <h6 className="text-secondary font-bold text-sm xs:text-base md:text-2xl">Secure Contribution</h6>
                        <p className="text-[#423D3D] text-xs md:text-lg font-normal max-xs:max-w-[246px] max-xs:mx-auto">
                            Lorem ipsum dolor sit amet consectetur. Et pellentesque arcu dictum amet mauris. Egestas urna nulla e. Facilisis
                            elementum quis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
