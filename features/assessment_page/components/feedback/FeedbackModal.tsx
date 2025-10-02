"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { FeedbackDetail } from "../shared/types";

interface FeedbackModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    title: string;
    feedback: FeedbackDetail;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
    isOpen,
    onOpenChange,
    title,
    feedback
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            scrollBehavior="inside"
            classNames={{
                closeButton: "mt-2 mr-2",
                backdrop: "z-[50000]", // Thấp hơn tutorial z-index
                wrapper: "z-[50001]"   // Modal content z-index
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold">{title} - Detailed Feedback</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Score: {feedback.score}</p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                {/* Strengths */}
                                <Card data-feedback-section="strengths">
                                    <CardHeader className="pb-2">
                                        <h4 className="text-md font-semibold text-green-600 dark:text-green-400">
                                            ✅ Strengths
                                        </h4>
                                    </CardHeader>
                                    <CardBody className="pt-0">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {feedback.strengths}
                                        </p>
                                    </CardBody>
                                </Card>

                                {/* Weaknesses */}
                                <Card data-feedback-section="improvements">
                                    <CardHeader className="pb-2">
                                        <h4 className="text-md font-semibold text-red-600 dark:text-red-400">
                                            ❌ Areas for Improvement
                                        </h4>
                                    </CardHeader>
                                    <CardBody className="pt-0">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {feedback.weaknesses}
                                        </p>
                                    </CardBody>
                                </Card>

                                {/* Suggestions */}
                                <Card data-feedback-section="suggestions">
                                    <CardHeader className="pb-2">
                                        <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400">
                                            💡 Suggestions
                                        </h4>
                                    </CardHeader>
                                    <CardBody className="pt-0">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {feedback.suggestions}
                                        </p>
                                    </CardBody>
                                </Card>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default FeedbackModal;
