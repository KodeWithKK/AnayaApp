import { FlatList, Image } from "react-native";

import { useQuery } from "@tanstack/react-query";

import { Text, View } from "~/components/core";
import { FullPageLoader } from "~/components/core/loaders";
import { api } from "~/lib/api";

import { LostPerson } from "~/types";

const ViewMissingPersons = () => {
  const { data: lostPersons, isLoading } = useQuery({
    queryKey: ["missing-persons"],
    queryFn: () => api.get<LostPerson[]>("/get-lost-person-reports"),
  });

  return (
    <View className="bg-secondary/30 px-4 py-6 dark:bg-background">
      {isLoading && <FullPageLoader />}
      {!isLoading && lostPersons?.data && (
        <FlatList
          data={lostPersons.data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="flex-row gap-3">
              <Image
                source={{ uri: item.lost_person_img }}
                className="h-[48px] w-[48px] rounded-lg"
                resizeMode="cover"
              />
              <View className="justify-evenly">
                <Text className="font-semibold text-lg">{item.fullname}</Text>
                <Text className="text-muted-foreground">
                  Age: {item.age}Yrs • Gender: {item.gender}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ViewMissingPersons;
