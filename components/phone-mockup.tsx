export default function PhoneMockup() {
  return (
    <div className="relative">
      {/* Placeholder for user's custom iPhone mockup */}
      <div className="w-[280px] h-[580px] bg-zinc-900/40 border-2 border-dashed border-zinc-700 rounded-[40px] flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-zinc-400 mb-2">Your iPhone mockup here</p>
          <p className="text-xs text-zinc-500">Replace this placeholder with your custom app screenshot</p>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
    </div>
  )
}
