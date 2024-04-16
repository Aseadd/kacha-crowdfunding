import education from "src/assets/svg/education.svg";
import healthCare from "src/assets/svg/health_care.svg";
import earth from "src/assets/svg/earth.svg";
import emergency from "src/assets/svg/emergency.svg";
import nonprofit from "src/assets/svg/nonprofit.svg";
import animal from "src/assets/svg/cil_animal.svg";
import community from "src/assets/svg/community.svg";
import family from "src/assets/svg/family.svg";

export default function Section4() {
    return (
        <section className="py-16 px-8 md:px-0 w-full bg-white">
            <div className="max-w-[1224px] mx-auto w-full flex flex-col gap-y-8 md:gap-y-16">
                <h1 className="text-secondary text-center text-base xs:text-2xl md:text-[34px] font-bold uppercase">explore by cause</h1>
                <div className="flex flex-col w-full md:w-[786px] md:mx-auto text-center justify-center gap-y-11 md:gap-y-14">
                    <div className="flex flex-col gap-y-11 gap-x-12 xs:flex-row w-full">
                        <div className="flex justify-center gap-x-12 w-full">
                            <Card title="Education" subtitle="# of projects" count="2.4K" src={education} className="pt-[2px]" />
                            <Card title="Healthcare" subtitle="# of projects" count="2.4K" src={healthCare} className="pt-[2px]" />
                        </div>
                        <div className="flex justify-center gap-x-12 w-full">
                            <Card title="Environment" subtitle="# of projects" count="2.4K" src={earth} />
                            <Card title="Emergency" subtitle="# of projects" count="2.4K" src={emergency} />
                        </div>

                        <Card title="Nonprofit" subtitle="# of projects" count="2.4K" src={nonprofit} className="max-xs:hidden" />
                    </div>
                    <div className="xs:hidden flex flex-col gap-y-11 xs:flex-row w-full">
                        <div className="flex justify-center gap-x-12 w-full">
                            <Card title="Nonprofit" subtitle="# of projects" count="2.4K" src={nonprofit} />
                            <Card title="Education" subtitle="# of projects" count="2.4K" src={education} />
                        </div>
                        <div className="flex justify-center gap-x-12 w-full">
                            <Card title="Education" subtitle="# of projects" count="2.4K" src={education} />
                            <Card title="Animal" subtitle="# of projects" count="2.4K" src={animal} />
                        </div>
                        <div className="flex justify-center gap-x-12 w-full">
                            <Card title="Community" subtitle="# of projects" count="2.4K" src={community} className="pt-[2px]" />
                            <Card title="Family" subtitle="# of projects" count="2.4K" src={family} className="pt-[2px]" />
                        </div>
                    </div>
                    <div className="max-xs:hidden flex flex-col gap-y-11 gap-x-12 xs:flex-row w-full">
                        <div className="flex justify-center gap-x-12 w-full">
                            <Card title="Education" subtitle="# of projects" count="2.4K" src={education} />
                            <Card title="Education" subtitle="# of projects" count="2.4K" src={education} />
                        </div>
                        <div className="flex justify-center gap-x-12 w-full">
                            <Card title="Animal" subtitle="# of projects" count="2.4K" src={animal} />
                            <Card title="Community" subtitle="# of projects" count="2.4K" src={community} />
                        </div>
                        <Card title="Family" subtitle="# of projects" count="2.4K" src={family} />
                    </div>
                </div>
            </div>
        </section>
    );
}

interface IProps {
    title: string;
    subtitle: string;
    count: string;
    src: string;
    className?: string;
}

function Card({ className, src, count, subtitle, title }: IProps) {
    return (
        <div className={`${className ?? ""} relative max-w-[120px] w-full h-[123px] xs:h-[138px] md:h-[148px]`}>
            <div className="absolute h-[90px] md:h-[100px] w-full rounded-xl border-[0.787px] border-primary top-8 xs:top-12">
                <div className="w-full h-full flex py-[6px] px-3 items-end">
                    <div className="w-full flex flex-col text-center">
                        <p className="text-[10.369px] md:text-xs text-[#6E7491] font-medium">{title}</p>
                        <div className="py-1">
                            <div className="border-t-[0.787px] border-t-[#F1F1F1]"></div>
                        </div>
                        <div className="flex flex-col gap-y-1 items-center">
                            <p className="text-[#A7B5BE] text-[9.062px] md:text-[11px] font-normal">{subtitle}</p>
                            <p className="text-[#6E7491] text-[9.062px] md:text-[11px] font-semibold">{count}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative max-xs:top-[1px] h-14 xs:h-[77px] md:h-20 w-14 xs:w-[76px] md:w-20 m-auto flex justify-center items-center bg-[url('../assets/svg/full-round-bg.svg')] bg-no-repeat bg-cover bg-center">
                <img src={src} alt="" />
            </div>
        </div>
    );
}
