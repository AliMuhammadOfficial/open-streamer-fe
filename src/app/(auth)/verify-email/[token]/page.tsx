export default function VerifyEmailPage({ params }: { params: { token: string } }) {
    const { token } = params;
  return (
    <div>
      <h1>Verify Email</h1>
      <p>Token: {token}</p>
    </div>
  );
}
