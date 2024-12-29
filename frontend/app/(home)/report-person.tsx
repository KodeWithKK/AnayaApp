import { useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Text, View } from "~/components/core";
import {
  FormDocumentPicker,
  FormSelect,
  FormTextInput,
} from "~/components/core/form-fields";
import { InlineLoader } from "~/components/core/loaders";
import { api, APIError, APIResponse } from "~/lib/api";
import {
  IReportPersonForm,
  reportPersonFormSchema,
} from "~/schema/report-person";
import { useToastContext } from "~/context/toast-provider";

const ReportPerson = () => {
  const { toast } = useToastContext();
  const [isPending, setIsPending] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<IReportPersonForm>({
    resolver: zodResolver(reportPersonFormSchema),
  });

  const onSubmit = handleSubmit((data) => {
    setIsPending(true);

    api
      .post("/report-lost-person", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: APIResponse) => {
        toast.success(res.message, {
          autoRemove: false,
        });
        router.replace("/");
      })
      .catch((err: APIError) => {
        toast.error(err.message, {
          autoRemove: false,
        });
      })
      .finally(() => setIsPending(false));
  });

  return (
    <ScrollView>
      <View className="flex-1 gap-4 bg-secondary/30 px-4 pb-8 pt-4 dark:bg-background">
        <Text className="mb-4 font-semibold text-[15px] uppercase text-muted-foreground">
          Missing Person Details
        </Text>

        <FormTextInput
          label="Name"
          control={control}
          name="fullname"
          placeholder="Enter full name"
        />

        <FormSelect
          label="Gender"
          control={control}
          name="gender"
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Other", value: "Other" },
          ]}
        />

        <FormTextInput
          label="Age"
          control={control}
          name="age"
          inputMode="numeric"
          placeholder="Enter age"
        />

        <FormTextInput
          label="Appearance"
          control={control}
          name="describe_appearance"
          placeholder="Enter appearance details"
        />

        <FormTextInput
          label="Last Seen"
          control={control}
          name="last_seen_location"
          placeholder="Enter last seen location"
        />

        <FormDocumentPicker
          label="Upload Person Image"
          control={control}
          name="file"
          documentType="image"
        />

        <Text className="my-4 font-semibold text-[15px] uppercase text-muted-foreground">
          Follow Up Details
        </Text>

        <FormTextInput
          label="Name"
          control={control}
          name="follow_up_name"
          placeholder="Enter full name"
        />

        <FormTextInput
          label="Phone Number"
          control={control}
          name="follow_up_phone"
          inputMode="tel"
          placeholder="Enter phone number"
        />

        <FormTextInput
          label="Email"
          control={control}
          name="follow_up_email"
          inputMode="email"
          placeholder="Enter email"
        />

        <FormTextInput
          label="Address"
          control={control}
          name="follow_up_address"
          placeholder="Enter address"
        />

        <Button className="mt-4" onPress={onSubmit} disabled={isPending}>
          <Text className="font-medium text-lg text-primary-foreground">
            {isPending ? <InlineLoader /> : "Submit"}
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ReportPerson;
