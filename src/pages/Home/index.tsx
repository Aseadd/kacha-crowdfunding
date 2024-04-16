import { useDispatch } from "react-redux";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import { useCampaignsMutation } from "src/api/data";
import { ICampaignsResponse } from "src/model/campaign";
import { setCampaign } from "src/store/states/campaign";
import { useEffect } from "react";

export default function Home() {
    const dispatch = useDispatch();
    const [fetchCampaignAction] = useCampaignsMutation();
    useEffect(() => {
        fetchCampaign();
        // eslint-disable-next-line
    }, []);

    const fetchCampaign = async () => {
        try {
            const { total_count, page, per_page, data }: ICampaignsResponse = await fetchCampaignAction({
                category_ids: [],
                tag_ids: [],
                limit: 10,
                page: 0,
            }).unwrap();
            dispatch(setCampaign({ data, total_count, page, limit: per_page }));
        } catch (error) {}
    };

    return (
        <main className="w-full">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
        </main>
    );
}
