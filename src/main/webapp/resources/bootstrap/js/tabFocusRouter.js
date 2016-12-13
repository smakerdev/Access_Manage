/*
	TabFocusRouter.js v4
	for IE 9+(I could not use `let` & `const`, and arrow functions, etc. because of this.)

	https://github.com/wlzla000/TabFocusRouter.js

	The version 1 developed on September 4, 2016.
	The version 2 developed on September 5, 2016.
	The version 3 developed on September 5, 2016.
	The version 4 developed on September 10, 2016.
	The developer: K.(wlzla000@naver.com)
*/

console.info("TabFocusRouter.js v4 has been loaded!",
	new (function Developer() {
		this["    nickname"] = "K."; // The first
		this["   email"] = "wlzla000@naver.com"; // The second
		this["  blog URI"] = "http://blog.naver.com/wlzla000"; // The third
		this[" GitHub repository URI"] = "https://github.com/wlzla000/TabFocusRouter.js"; // fourth
	}));

(function capsule() {
		if("TabFocusRouter" in window)
		{
			console.error("TabFocusRouter is already working!");
			return false;
		}

		var TabFocusRouterClass = function TabFocusRouter(eventCaptureWindow) {
				if(eventCaptureWindow === undefined) eventCaptureWindow = window; // default
				var that = this;

				this.displayTheFocused = false;
				var tabFocusRoutes = []; // An array of `{ID, priority, nodes}`.
				this.tabFocusRoutes = tabFocusRoutes;
				/*
					A route node can be
						a selector for a DOM element,
						a DOM element,
						TabFocusRouterInstance.STOP,
						TabFocusRouterInstance.DEFAULT.
				*/

				function spreadRoute(currentNodeInformation)
				{
					var theSpreadRoute = [], currentNodeIndex;
					currentNodeInformation.mainRoute.forEach(function(mainRouteNode, mainRouteNodeIndex) {
							if(typeof mainRouteNode === "string" && mainRouteNode !== that.DEFAULT && mainRouteNode !== that.STOP) // If the node is a CSS selector:
							{
								Array.prototype.forEach.call(eventCaptureWindow.document.querySelectorAll(mainRouteNode), function(subrouteNode, subrouteNodeIndex) {
										if(mainRouteNodeIndex === currentNodeInformation.mainRouteNodeIndex
										&& subrouteNodeIndex === currentNodeInformation.subrouteNodeIndex) currentNodeIndex = theSpreadRoute.length;

										theSpreadRoute.push(subrouteNode);
									});
							}
							else
							{
								if(mainRouteNodeIndex === currentNodeInformation.mainRouteNodeIndex) currentNodeIndex = theSpreadRoute.length;

								theSpreadRoute.push(mainRouteNode);
							}
						});
					return {theSpreadRoute: theSpreadRoute, currentNodeIndex: currentNodeIndex};
				}
				function getThePreviousNode(currentNodeInformation)
				{
					var routeSpreadingResult = spreadRoute(currentNodeInformation);
					var theSpreadRoute = routeSpreadingResult.theSpreadRoute;
					var currentNodeIndex = routeSpreadingResult.currentNodeIndex;

					if((currentNodeIndex - 1) in theSpreadRoute) return theSpreadRoute[currentNodeIndex - 1];
					else
						return theSpreadRoute[theSpreadRoute.length - 1];
				}
				function getTheNextNode(currentNodeInformation)
				{
					var routeSpreadingResult = spreadRoute(currentNodeInformation);
					var theSpreadRoute = routeSpreadingResult.theSpreadRoute;
					var currentNodeIndex = routeSpreadingResult.currentNodeIndex;

					if((currentNodeIndex + 1) in theSpreadRoute) return theSpreadRoute[currentNodeIndex + 1];
					else
						return theSpreadRoute[0];
				}

				eventCaptureWindow.addEventListener("keydown", function(event) {
						if(event.key !== "Tab"
						|| eventCaptureWindow.document.activeElement === eventCaptureWindow.document.body
						|| eventCaptureWindow.document.activeElement === null) return;

						if(that.displayTheFocused) console.info("TabFocusRouter.js - the focused element was ", eventCaptureWindow.document.activeElement);

						var current;
						if(tabFocusRoutes.some(function findTheRoute(tabFocusRoute) {
						/*|*/		if(tabFocusRoute.nodes.length === 0) return;
						/*|*/
						/*|*/		if(tabFocusRoute.nodes.some(function findTheMatchingNode(node, nodeIndex, mainRoute) {
						/*|*/				if(node === that.DEFAULT || node === that.STOP) return;
						/*|*/
						/*|*/				if(typeof node === "string") // A CSS selector
						/*|*/				{
						/*|*/					if(Array.prototype.some.call(eventCaptureWindow.document.querySelectorAll(node), function(subrouteNode, subrouteNodeIndex, subroute) {
						/*|*/							if(subrouteNode === eventCaptureWindow.document.activeElement) // Is the node on this route?
						/*|*/							{
						/*|*/								current = {
						/*|*/										routeInformation: tabFocusRoute,
						/*|*/										mainRoute: mainRoute,
						/*|*/										mainRouteNodeIndex: nodeIndex,
						/*|*/										subroute: subroute,
						/*|*/										subrouteNodeIndex: subrouteNodeIndex
						/*|*/									};
						/*|*/
						/*|*/								return true; // It has found the route!
						/*|*/							}
						/*|*/						})) return true; // It seems that the route has been found!
						/*|*/				}
						/*|*/				else // A DOM element
						/*|*/				{
						/*|*/					if(node === eventCaptureWindow.document.activeElement) // Is the node on this route?
						/*|*/					{
						/*|*/						current = {
						/*|*/								routeInformation: tabFocusRoute,
						/*|*/								mainRoute: mainRoute,
						/*|*/								mainRouteNodeIndex: nodeIndex
						/*|*/							};
						/*|*/
						/*|*/						return true; // It has found the route!
						/*|*/					}
						/*|*/				}
						/*|*/			})) return true; // It seems that the route has been found!
						/*|*/	}))
						{
							var nodeToFocus;
							if(event.shiftKey) // Focus the previous one!
							{
								if(current.routeInformation.ignoreShiftTab === false) nodeToFocus = getThePreviousNode(current);
							}
							else // Focus the next one!
							{
								if(current.routeInformation.ignoreNormalTab === false) nodeToFocus = getTheNextNode(current);
							}
							if(nodeToFocus === undefined || nodeToFocus === that.DEFAULT);
							else if(nodeToFocus === that.STOP) event.preventDefault();
							else
							{
								nodeToFocus.focus();
								event.preventDefault();
							}
						}
					});
			};
		TabFocusRouterClass.prototype = {
				DEFAULT: "__DefaultBehavior",
				STOP: "__PreventDefaultBehavior",
				PRIORITY__CURRENTLY_HIGHEST: "__Priority_TheHighestCurrently",
				PRIORITY__CURRENTLY_LOWEST: "__Priority_TheLowestCurrently",
				createRoute: function createTabFocusRoute(routeID, routeNodes, priority) {
						if(this.tabFocusRoutes.some(function(tabFocusRoute) {
								return tabFocusRoute.ID === routeID;
							})) throw Error("The route ID is already in use!"); // if there is a duplicated one.

						if([this.PRIORITY__CURRENTLY_HIGHEST, this.PRIORITY__CURRENTLY_LOWEST, undefined].indexOf(priority) != -1)
						{
							if(this.tabFocusRoutes.length === 0) priority = 0;
							else
							{
								var priorityArray = this.tabFocusRoutes.map(function(tabFocusRoute) {
										return tabFocusRoute.priority;
									});
								if(priority === this.PRIORITY__CURRENTLY_HIGHEST) priority = Math.max.apply(null, priorityArray) + 1;
								else if(priority === undefined || priority === this.PRIORITY__CURRENTLY_LOWEST) priority = Math.min.apply(null, priorityArray) - 1;
							}
						}

						this.tabFocusRoutes.push({ID: routeID, priority: priority, nodes: routeNodes, ignoreNormalTab: false, ignoreShiftTab: false});
						this.tabFocusRoutes.sort(function(aRoute, bRoute) {
								return bRoute.priority - aRoute.priority;
							});
					},
				setRouteAttribute: function setTabFocusRouteAttribute(routeID, ignoreNormalTab, ignoreShiftTab) {
						return this.tabFocusRoutes.some(function(tabFocusRoute) {
								if(tabFocusRoute.ID === routeID)
								{
									tabFocusRoute.ignoreNormalTab = !!ignoreNormalTab;
									tabFocusRoute.ignoreShiftTab = !!ignoreShiftTab;
									return true;
								}
							});
					},
				removeRoute: function removeTabFocusRoute(routeID) {
						this.tabFocusRoutes.splice(this.tabFocusRoutes.map(function(tabFocusRoute) {
								return tabFocusRoute.ID;
							}).indexOf(routeID), 1);
					}
			};

		Object.defineProperty(window, "TabFocusRouter", {value: TabFocusRouterClass});
	})();