<template>
	<div class="row text-center">
		<div class="col-md-4 text-right"><slot name="label"></slot></div>
		<div
			class=" text-left bootstrap-switch bootstrap-switch-wrapper  bootstrap-switch-animate"
			:class="switchClass"
		>
			<div class="bootstrap-switch-container " @click="triggerToggle()">
				<span class="bootstrap-switch-handle-on text-success ">
					<slot name="on">
						{{ onText }}
					</slot>
				</span>
				<span class="bootstrap-switch-label"></span>
				<span class="bootstrap-switch-handle-off bootstrap-switch-default">
					<slot name="off">
						{{ offText }}
					</slot>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'n-switch',
	props: {
		value: [Array, Boolean],
		onText: String,
		offText: String,
	},
	computed: {
		switchClass() {
			let base = 'bootstrap-switch-'
			let state = this.model ? 'on' : 'off'
			let classes = base + state
			return classes
		},
		model: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('input', value)
			},
		},
	},
	methods: {
		triggerToggle() {
			this.model = !this.model
		},
	},
}
</script>
