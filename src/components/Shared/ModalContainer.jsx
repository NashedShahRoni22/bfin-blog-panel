export default function ModalContainer({ children }) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/30 px-4 lg:absolute">
      {children}
    </div>
  );
}
