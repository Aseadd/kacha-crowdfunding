import { Outlet } from "react-router-dom";
import { PolicyNaLink } from "src/components/DropdownItem";
import { RouteName } from "src/constants/routes";

export default function PolicyLayout() {
    return (
        <main className="w-full max-w-[1200px] mx-auto md:pr-[54px] flex items-start">
            <div className="max-md:hidden pt-16 max-w-[300px] w-full">
                <div className="w-full flex flex-col gap-y-3 border-l border-secondary">
                    <PolicyNaLink to={RouteName.PolicyPrivacy} text={"Privacy and Policy"} />
                    <PolicyNaLink to={RouteName.TermsConditions} text={"Terms & Conditions"} />
                    <PolicyNaLink to={RouteName.CharityDisclosure} text={"Charity Disclosure"} />
                </div>
            </div>
            <Outlet />
        </main>
    );
}
