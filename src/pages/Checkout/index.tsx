import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import loadScript from "load-script";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNotificationContext } from "src/context/NotificationContext";
import { ICheckout, PayViaType } from "src/model/donate";
import { selectAuth } from "src/store/states/auth";

export default function Checkout() {
    const user = useSelector(selectAuth).user;
    const [checkout, setCheckout] = useState<ICheckout>({ loading: true });
    const ref: any = useRef();
    const state = useLocation().state;
    const { showError } = useNotificationContext();

    useEffect(() => {
        if (!state) showError({ message: "Checkout is not found" });
        else setCheckout({ loading: false, data: state });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (checkout.data) {
            if ([PayViaType.JENGA, PayViaType.VISA].includes(checkout.data?.pay_via)) {
                try {
                    (ref.current as HTMLFormElement)?.submit();
                } catch (error) {
                    const submitButton = document.createElement("button");
                    submitButton.style.display = "none";

                    ref.current.appendChild(submitButton);
                    submitButton.click();
                    ref.current.removeChild(submitButton);
                }
            } else if (PayViaType.MASTERCARD === checkout.data?.pay_via) {
                const sessionId = checkout.data["session_id"];
                const merchantID = checkout.data["merchantID"];
                const referenceNumber = checkout.data["reference_number"];
                (window as any).errorCallback = function errorCallback(error: any) {
                    alert("Error: " + JSON.stringify(error));
                };

                (window as any).cancelCallback = function cancelCallback() {
                    alert("Payment cancelled");
                };

                (window as any).completeCallback = function completeCallback() {
                    alert("Payment success");
                    alert("thank you for buying");
                };

                loadScript("https://test-gateway.mastercard.com/checkout/version/61/checkout.js", (error) => {
                    if (error) {
                    } else {
                        const Checkout: any = (window as any).Checkout;

                        Checkout.configure({
                            session: { id: sessionId },
                            merchant: merchantID,
                            order: {
                                description: "test description",
                                id: referenceNumber,
                            },

                            interaction: {
                                merchant: {
                                    name: `${user?.firstname} ${user?.lastname}`,
                                    address: {
                                        line1: user?.address ?? "Addis Ababa",
                                        line2: "Ethiopia",
                                    },
                                },
                            },
                        });
                        Checkout.showPaymentPage();
                    }
                });
            }
        }
        // eslint-disable-next-line
    }, [checkout.data]);

    return (
        <div className="w-full min-h-screen px-3 py-3 flex flex-col justify-center items-center">
            <div className="w-full flex min-h-screen justify-center items-center p-10 mx-auto">
                <Spin tip="" size="large"></Spin>
            </div>
            {checkout.data && (
                <div className="w-full">
                    {checkout.data?.pay_via === PayViaType.JENGA ? (
                        <form ref={ref} action="https://v3-uat.jengapgw.io/processPayment" method="POST">
                            <input type="hidden" id="token" name="token" value={checkout.data.token} />
                            <input type="hidden" id="merchantCode" name="merchantCode" value={checkout.data["merchantCode"]} />
                            <input type="hidden" id="currency" name="currency" value={checkout.data["currency"] ?? "USD"} />
                            <input type="hidden" id="orderAmount" name="orderAmount" value={checkout.data["orderAmount"]} />
                            <input type="hidden" id="orderReference" name="orderReference" value={checkout.data["orderReference"]} />
                            <input type="hidden" id="productType" name="productType" value={checkout.data["productType"]} />
                            <input
                                type="hidden"
                                id="productDescription"
                                name="productDescription"
                                value={checkout.data["productDescription"]}
                            />
                            <input
                                type="hidden"
                                id=" paymentTimeLimit name= paymentTimeLimit "
                                value={checkout.data[" paymentTimeLimit"]}
                            />
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
                            <input
                                type="hidden"
                                id="customerPostalCodeZip"
                                name="customerPostalCodeZip"
                                value={checkout.data["customerPostalCodeZip"]}
                            />
                            <input
                                type="hidden"
                                id="customerAddress"
                                name="customerAddress"
                                value={checkout.data["customerAddress"] ?? user?.address}
                            />
                            <input
                                type="hidden"
                                id="customerEmail"
                                name="customerEmail"
                                value={checkout.data["customerEmail"] ?? user?.email}
                            />
                            <input
                                type="hidden"
                                id="customerPhone"
                                name="customerPhone"
                                value={checkout.data["customerPhone"] ?? user?.phone}
                            />
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
                    ) : checkout.data.pay_via === PayViaType.VISA ? (
                        <form action={checkout.data["form_url"]} method="POST" ref={ref}>
                            {Object.keys(checkout.data).map((key, index) =>
                                ![
                                    "pay_via",
                                    "type",
                                    "token",
                                    "merchantCode",
                                    "callbackUrl",
                                    "orderAmount",
                                    "orderReference",
                                    "form_url",
                                ].includes(key) ? (
                                    <input type="hidden" id={key} name={key} value={checkout.data[key]} key={index} />
                                ) : null
                            )}
                        </form>
                    ) : null}
                </div>
            )}
        </div>
    );
}
