'use client';

import RequestOtpForm from '@/app/(main)/(auth)/login/components/RequestOTPForm';
import VerifyOtpForm from '@/app/(main)/(auth)/login/components/VerifyOTPForm';
import { useOTPLogin } from '@/lib/hooks/useOTPLogin';

export default function OTPLoginForm() {
  const { formState, loading, handleRequest, handleVerify, handleBack } = useOTPLogin();
  return (
    <div className="space-y-4">
      {formState.error && <p className="text-base text-red-500">{formState.error}</p>}
      {formState.step === 'request' ? (
        <RequestOtpForm loading={loading} onSubmit={handleRequest} />
      ) : (
        <VerifyOtpForm
          loading={loading}
          email={formState.email}
          onSubmit={handleVerify}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
