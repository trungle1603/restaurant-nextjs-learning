interface Props {
    input: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        city: string;
        password: string;
    };
    isSignIn: boolean;
    handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function AuthModelInputs({
    input,
    isSignIn,
    handleChangeInput,
}: Props) {
    return (
        <div>
            {isSignIn ? null : (
                <>
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-2 w-[49%]"
                            placeholder="First Name"
                            value={input.firstName}
                            onChange={handleChangeInput}
                            name="firstName"
                        />
                        <input
                            type="text"
                            className="border rounded p-2 py-2 w-[49%]"
                            placeholder="Last Name"
                            value={input.lastName}
                            onChange={handleChangeInput}
                            name="lastName"
                        />
                    </div>
                    <div className="my-3 flex justify-between text-sm">
                        <input
                            type="text"
                            className="border rounded p-2 py-2 w-[49%]"
                            placeholder="Phone"
                            value={input.phone}
                            onChange={handleChangeInput}
                            name="phone"
                        />
                        <input
                            type="text"
                            className="border rounded p-2 py-2 w-[49%]"
                            placeholder="City"
                            value={input.city}
                            onChange={handleChangeInput}
                            name="city"
                        />
                    </div>
                </>
            )}

            <div className="my-3 flex justify-between text-sm">
                <input
                    type="text"
                    className="border rounded p-2 py-2 w-full"
                    placeholder="Email"
                    value={input.email}
                    onChange={handleChangeInput}
                    name="email"
                />
            </div>
            <div className="my-3 flex justify-between text-sm">
                <input
                    type="text"
                    className="border rounded p-2 py-2 w-full"
                    placeholder="Password"
                    value={input.password}
                    onChange={handleChangeInput}
                    name="password"
                />
            </div>
        </div>
    );
}
