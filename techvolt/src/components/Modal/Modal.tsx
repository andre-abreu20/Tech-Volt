import { ModalProps } from "@/types/types";
import Botao from "../Botao/Botao";

export default function Modal({ isOpen, onClose, onConfirm, title, message }: ModalProps) {
    if (!isOpen) return null;

        return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[500px] m-auto">
            <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-green-1 mb-3 md:mb-4">
                {title}
                </h2>
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                {message}
                </p>
                <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 md:justify-end">
                <Botao
                    variant="white"
                    onClick={onClose}
                >
                    Cancelar
                </Botao>
                <Botao
                    variant="default"
                    onClick={onConfirm}
                >
                    Confirmar Exclusão
                </Botao>
                </div>
            </div>
            </div>
        </div>
        );
}