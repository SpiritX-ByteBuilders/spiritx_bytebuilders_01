import { useState } from "react";
import { useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, router } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route("register"), {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessMessage(
                    "Registration successful! Redirecting to login..."
                );
                setIsModalOpen(true);

                setTimeout(() => {
                    router.visit(route("login"));
                }, 2000);
            },
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Password strength evaluation function
    const evaluatePasswordStrength = (password: string) => {
        let strength = 0;

        // Criteria: Length (>= 8)
        if (password.length >= 8) strength++;
        // Criteria: Contains at least one number
        if (/[0-9]/.test(password)) strength++;
        // Criteria: Contains at least one special character
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        // Criteria: Contains both uppercase and lowercase
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setData("password", password);
        evaluatePasswordStrength(password);
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Registration Form */}
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />

                    {/* Password Strength Indicator */}
                    <div className="mt-2">
                        <div
                            className={`h-2 rounded-md ${
                                passwordStrength === 0
                                    ? "bg-gray-300"
                                    : passwordStrength === 1
                                    ? "bg-red-500"
                                    : passwordStrength === 2
                                    ? "bg-yellow-500"
                                    : passwordStrength === 3
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                            }`}
                        ></div>
                        {passwordStrength === 0 && (
                            <p className="text-sm text-gray-500 mt-1">Weak</p>
                        )}
                        {passwordStrength === 1 && (
                            <p className="text-sm text-red-500 mt-1">Weak</p>
                        )}
                        {passwordStrength === 2 && (
                            <p className="text-sm text-yellow-500 mt-1">
                                Moderate
                            </p>
                        )}
                        {passwordStrength === 3 && (
                            <p className="text-sm text-blue-500 mt-1">Strong</p>
                        )}
                        {passwordStrength === 4 && (
                            <p className="text-sm text-green-500 mt-1">
                                Very Strong
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Already registered?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>

            {/* Success Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-center text-green-600">
                            {successMessage}
                        </h3>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}
