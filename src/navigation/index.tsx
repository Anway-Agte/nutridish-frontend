import { NavigationContainer } from "@react-navigation/native"
import { HomeNavigator } from "./homeStackNavigator"

export const AppNavigator = () => {
    return(
        <NavigationContainer>
            <HomeNavigator/>
        </NavigationContainer>
    )
}