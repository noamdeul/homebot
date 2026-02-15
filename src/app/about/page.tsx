export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-blue-900">About us</h1>
      <div className="mt-6 space-y-4 text-blue-700">
        <p>
          Homebot is dedicated to making home cleaning effortless. Our robots
          handle floors, dishes, laundry, and windows so you can spend more time
          on what matters.
        </p>
        <p>
          We combine smart technology with reliable hardware to deliver
          products that work day in and day out. Thank you for choosing
          Homebot.
        </p>
      </div>

      <section className="mt-10 border-t border-blue-200 pt-8">
        <h2 className="text-lg font-semibold text-blue-900">Our story</h2>
        <p className="mt-3 text-blue-700">
          We are three middle school students—Omri, Gaash, and Amit—who were
          smart enough to imagine the future of home cleaning. That vision
          became Homebot.
        </p>
      </section>
    </div>
  );
}
