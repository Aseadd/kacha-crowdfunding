import { useSelector } from "react-redux";
import { ICheckout } from "src/model/donate";
import { selectAuth } from "src/store/states/auth";

interface IProps {
    checkout: ICheckout;
    ref: any;
}

export default function JengaFrom({ checkout, ref }: IProps) {
    const user = useSelector(selectAuth).user;
    return (
        <form ref={ref} action="https://v3-uat.jengapgw.io/processPayment" method="POST">
            <input type="hidden" id="token" name="token" value={checkout.data.token} />
            <input type="hidden" id="merchantCode" name="merchantCode" value={checkout.data["merchantCode"]} />
            <input type="hidden" id="currency" name="currency" value={checkout.data["currency"] ?? "USD"} />
            <input type="hidden" id="orderAmount" name="orderAmount" value={checkout.data["orderAmount"]} />
            <input type="hidden" id="orderReference" name="orderReference" value={checkout.data["orderReference"]} />
            <input type="hidden" id="productType" name="productType" value={checkout.data["productType"]} />
            <input type="hidden" id="productDescription" name="productDescription" value={checkout.data["productDescription"]} />
            <input type="hidden" id=" paymentTimeLimit name= paymentTimeLimit " value={checkout.data[" paymentTimeLimit"]} />
            <input
                type="hidden"
                id="customerFirstName"
                name="customerFirstName"
                value={checkout.data["customerFirstName"] ?? user?.firstname}
            />
            <input
                type="hidden"
                id="customerLastName"
                name="customerLastName"
                value={checkout.data["customerLastName"] ?? user?.lastname}
            />
            <input type="hidden" id="customerPostalCodeZip" name="customerPostalCodeZip" value={checkout.data["customerPostalCodeZip"]} />
            <input type="hidden" id="customerAddress" name="customerAddress" value={checkout.data["customerAddress"] ?? user?.address} />
            <input type="hidden" id="customerEmail" name="customerEmail" value={checkout.data["customerEmail"] ?? user?.email} />
            <input type="hidden" id="customerPhone" name="customerPhone" value={checkout.data["customerPhone"] ?? user?.phone} />
            <input type="hidden" id="extraData" name="extraData" value={checkout.data["extraData"]} />
            <input type="hidden" id="callbackUrl" name="callbackUrl" value={checkout.data["callbackUrl"]} />
            <input type="hidden" id="countryCode" name="countryCode" value={checkout.data["countryCode"] ?? "ET"} />
            <input
                type="hidden"
                id="signature"
                name="signature"
                value={
                    checkout.data["merchantCode"] +
                    checkout.data["orderReference"] +
                    checkout.data["currency"] +
                    `${checkout.data["orderAmount"]}` +
                    checkout.data["callbackUrl"]
                }
            />
        </form>
    );
}
